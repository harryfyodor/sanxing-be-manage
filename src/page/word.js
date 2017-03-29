import React, { Component } from 'react'
import { Card, Button } from 'antd';

class Word extends Component {
  render () {
    return <div>
    <div className="title">
        <h2>词卡管理~</h2>
    </div>
    <div>
    {
        [1,2,3,4,5,5].map((item, index) => {
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

export default Word;
