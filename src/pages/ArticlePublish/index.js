import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Button, Space, Input, Radio, Upload, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import Channel from 'components/Channel'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { baseURL } from 'utils/request'
import { addArticle, getArticleById, updateArticle } from 'api/article'

export default class Articlepublish extends Component {
  state = {
    type: 1,
    // 用于控制上传的图片以及图片的显示
    fileList: [],
    showProview: false,
    previewUrl: '',
    id: this.props.match.params.id
  }
  formRef = React.createRef()
  render() {
    const { type, fileList, showProview, previewUrl, id } = this.state
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">{id ? '编辑文章' : '发布文章'}</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          <Form labelCol={{ span: 4 }} size="large" onFinish={this.onFinish} validateTrigger={['onBlur', 'onChange']} initialValues={{ content: '', type: type }} ref={this.formRef}>
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章的标题不能为空'
                }
              ]}
            >
              <Input style={{ width: 400 }} placeholder="请输入文章的标题"></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道'
                }
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              {type !== 0 && (
                // fileList 控制上传的文件列表
                // action 上传的url，必须是一个完整的url
                // name 指定上传的名字 后台规定是image
                <Upload listType="picture-card" fileList={fileList} action={`${baseURL}upload`} name="image" onChange={this.uploadImage} onPreview={this.handlePreview} beforeUpload={this.beforeUpload}>
                  {fileList.length < type && <PlusOutlined />}
                </Upload>
              )}
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[
                {
                  required: true,
                  message: '文章的内容不能为空'
                }
              ]}
            >
              <ReactQuill theme="snow" placeholder="请输入文章的内容"></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  {id ? '编辑文章' : '发布文章'}
                </Button>
                <Button size="large" onClick={this.addDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
        {/* 图片预览弹窗 */}
        <Modal visible={showProview} title="图片预览" footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewUrl} />
        </Modal>
      </div>
    )
  }

  async componentDidMount() {
    // 判断是否有id，然后看发起请求获取文章详情
    if (this.state.id) {
      const res = await getArticleById(this.state.id)
      // 给表单设置values值
      const values = {
        ...res.data,
        type: res.data.cover.type
      }
      this.formRef.current.setFieldsValue(res.data)
      const fileList = res.data.cover.images.map(item => {
        return {
          url: item
        }
      })
      this.setState({
        fileList,
        type: res.data.cover.type
      })
    }
  }

  // 上传前的校验
  beforeUpload = file => {
    if (file.size > 1024 * 500) {
      message.warning('上传图片大小不能超过500kb')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warning('只能上传jpeg或png的图片')
      return Upload.LIST_IGNORE
    }
    return true
  }

  // 关闭图片预览
  handleCancel = () => {
    this.setState({
      showProview: false,
      previewUrl: ''
    })
  }

  // 图片预览
  // 如果图片地址是回显的，可通过file.url直接拿到
  // 如果是自己上传的，需要通过file.response.data.url才能拿到
  handlePreview = file => {
    const url = file.url || file.response.data.url
    this.setState({
      showProview: true,
      previewUrl: url
    })
  }

  // 上传图片
  uploadImage = ({ fileList }) => {
    // 点击上传后，会得到所有图片信息，将信息赋值给fileList
    this.setState({
      fileList
    })
  }

  // 改变单选类型
  changeType = e => {
    this.setState({
      type: e.target.value,
      // 切换选择后，应该清空图片数组
      fileList: []
    })
  }

  // 提交和草稿公用方法
  async save(values, draft) {
    const { fileList, type } = this.state
    if (fileList.length !== type) {
      return message.warning('上传的图片数量不正确')
    }
    const images = fileList.map(item => {
      return item.url || item.response.data.url
    })
    // 判断是修改文章还是添加文章
    if (this.state.id) {
      // 有id是修改文章
      await updateArticle(
        {
          ...values,
          cover: {
            type,
            images
          },
          id: this.state.id
        },
        draft
      )
      message.success('编辑成功', 1)
    } else {
      // 没有id添加文章
      await addArticle(
        {
          ...values,
          cover: {
            type,
            images
          }
        },
        draft
      )
      message.success('添加成功', 1)
    }

    this.props.history.push('/home/list')
  }
  // 表单提交事件
  onFinish = async values => {
    this.save(values, false)
  }

  // 存入草稿
  addDraft = async () => {
    const values = await this.formRef.current.validateFields()
    this.save(values, true)
  }
}
