import React, { Component } from 'react'
import { Card, Button } from 'antd';

class Pics extends React.Component {
  render () {
    return <div>
    <div className="title">
        <h2>每日问题</h2>
        <Button style={{marginBottom: '10px'}}>添加图片</Button>
    </div>
    <div>
     {
         [1,2,3,4,5,5].map((tag, index) => {
            return <Card style={{ width: 240, display: 'inline-block', margin: '10px' }} bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                    <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                </div>
                <div className="custom-card">
                    <h3>Europe Street beat</h3>
                    <p>www.instagram.com</p>
                </div>
            </Card>
         })
     }
     </div>
    </div>
  }
}

export default Pics;
