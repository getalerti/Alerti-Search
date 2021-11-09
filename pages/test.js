import React, { Component } from 'react';
import { stringToSlug } from '../helpers/functions';
import MeiliSearchService from '../services/MeiliSearch.service'

class Test extends Component {

  constructor(props) {
    super(props);
  }
  showFile = async (e) => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = (e.target.result)
      const lines = text.split(/\r?\n/);
      const service = new MeiliSearchService()
      const datas = []
      let id = 1;
      lines.forEach((item, i) => {
        const headers = lines[0].split('§')
        const data = {}
        const cols = item.split('§')
        if (cols.length == 97 && i > 0) {
          headers.forEach((title, x) => {
            if (title === 'id') {
              data['id'] = id
              id++
            } else {
              data[title] = cols[x] || ""
            }
          });
          datas.push(data)
        }
      });
      await (await service.request('PUT', `/documents`, datas)).json()
    };
    reader.readAsText(e.target.files[0])
  }
  render = () => {

    return (<div>
      <input type="file" onChange={(e) => this.showFile(e)} />
    </div>
    )
  }
}

export default Test;
