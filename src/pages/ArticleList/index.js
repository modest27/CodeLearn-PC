import React, { Component } from 'react'
import styles from './index.module.scss'
import { Card, Breadcrumb, Form, Radio, Button, Select, DatePicker, Table } from 'antd'
import { Link } from 'react-router-dom'

import { ArticleStatus } from 'api/constants'
import { getChannels } from 'api/channel'
import { getArticles } from 'api/article'
const { Option } = Select

export default class ArticleList extends Component {
  columns = [
    {
      title: '封面',
      dataIndex: 'name'
    },
    {
      title: '标题',
      dataIndex: 'age'
    },
    {
      title: '状态',
      dataIndex: 'address'
    },
    {
      title: '发布时间',

      dataIndex: 'tags'
    },
    {
      title: '阅读数',
      dataIndex: 'tags'
    },
    {
      title: '评论数',

      dataIndex: 'tags'
    },
    {
      title: '点赞数',

      dataIndex: 'tags'
    },
    {
      title: '操作',

      dataIndex: 'tags'
    }
  ]

  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]

  state = {
    channels: [],
    articles: {}
  }
  render() {
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

        <Card title={'根据查询结果查询到了xxx条结果：'}>
          <Table columns={this.columns} dataSource={this.data} />;
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
