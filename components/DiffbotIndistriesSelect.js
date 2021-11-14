import Select from 'react-select'
import industries from './../helpers/industries.json'
export default ({ onchange }) => {
    return <Select options={industries} className="custom-select mb-3" styles={{ textAlign: 'left' }} onChange={onchange} />
}