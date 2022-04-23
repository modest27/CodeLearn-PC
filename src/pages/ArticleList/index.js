import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio, Button, Select, DatePicker, Table } from 'antd'
import { Link } from 'react-router-dom'

import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
import defaultImg from 'assets/error.png'
const { Option } = Select

export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      render(data) {
        if (data.cover.type === 0) {
          // 无图，渲染默认图片
          return <img src={defaultImg} alt="" style={{ width: 200, height: 120, objectFit: 'cover' }} />
        }
        // 有图渲染
        return <img src={data.cover.images[0]} alt="" style={{ width: 200, height: 120, objectFit: 'cover' }} />
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status'
    },
    {
      title: '发布时间',

      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',

      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',

      dataIndex: 'like_count'
    },
    {
      title: '操作'
    }
  ]

  state = {
    channels: [],
    articles: {}
  }
  render() {
    const { total_count, results } = this.state.articles
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">文章列表</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* 表单结构 */}
          <Form initialValues={{ status: -1 }} onFinish={this.onFinish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArticleStatus.map(item => {
                  return (
                    <Radio value={item.id} key={item.id}>
                      {item.name}
                    </Radio>
                  )
                })}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="channel_id">
              <Select style={{ width: 200 }} placeholder="请选择文章频道">
                {this.state.channels.map(item => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item label="日期" name="">
              <DatePicker.RangePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据查询结果查询到了 ${total_count} 条结果：`}>
          <Table columns={this.columns} dataSource={results} rowKey="id" />;
        </Card>
      </div>
    )
  }

  componentDidMount() {
    this.getChannelList()
    this.getArticleList()
  }

  async getChannelList() {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels
    })
  }

  async getArticleList() {
    const res = await getArticles()
    this.setState({
      articles: res.data
    })
  }

  onFinish = value => {
    console.log(value)
  }
}
