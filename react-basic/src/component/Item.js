import PropTypes from 'prop-types';
import "./item.css"
const Item = (props) =>{
    const status = props.amount<0 ? "expense":"income"
    const symbol = props.amount<0 ? "":"+"
    const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    return (
        <li className={status}>{props.title}<span>{symbol}{formatNumber(props.amount)}</span>
        
        </li>
    );
}
Item.propTypes={
    title:PropTypes.string ,
    amount:PropTypes.number
}
export default Item