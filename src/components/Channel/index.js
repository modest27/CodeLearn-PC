import React, { Component } from 'react'
import { Select } from 'antd'
import { getChannels } from 'api/channel'
const { Option } = Select

export default class Channel extends Component {
  state = {
    channels: []
  }
  componentDidMount() {
    this.getChannelList()
  }

  async getChannelList() {
    const res = await getChannels()
    this.setState({
      channels: res.data.channels
    })
  }
  render() {
    return (
      <Select style={{ width: 200 }} placeholder="请选择文章频道" value={this.props.value} onChange={this.props.onChange}>
        {this.state.channels.map(item => {
          return (
            <Option value={item.id} key={item.id}>
              {item.name}
            </Option>
          )
        })}
      </Select>
    )
  }
}
