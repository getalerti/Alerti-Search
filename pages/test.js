import React, { Component } from 'react';
import SupabaseService from './../services/Supabase.service'

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
      const service = new SupabaseService()
      const datas = []
      lines.forEach((item, i) => {
        const headers = lines[0].split('§')
        const data = {}
        const cols = item.split('§')
        if (cols.length == 97 && i > 0) {
          headers.forEach((title, x) => {
            data[title] = cols[x] || "-"
          });
          datas.push(data)
        }
      });

      await service.supabase
      .from('companies')
      .insert(datas)

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
