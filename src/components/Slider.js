import React from 'react';
import ReactDOM from 'react-dom';
import SliderDots from "./SliderDots";
import SliderArrows from "./SliderArrows";
import SliderItems from "./SliderItems";
require('./Slider.less');
export default class Slider extends React.Component{
    constructor(props){
        super(props);
        this.state = {pos:0};//默认索引
    }
    //turn表示切换 n表示切换的步长
    turn(n){
        let pos = this.state.pos;//获取旧索引
        pos+=n;
        if(pos >= this.props.images.length){
             pos= 0;
        }
        if(pos < 0){
            pos=this.props.images.length-1;
        }
        this.setState({pos});
    }
    play(){//开启定时器进行自动轮播
        this.$timer = setInterval(()=>{
            this.turn(1);
        },this.props.interval*1000)
    }
    componentDidMount(){//组件加载完成之后
        if(this.props.autoplay){
            this.play();
        }
    }
    render(){
        let images = this.props.images;
        let style = {
            width:200*images.length,
            left:this.state.pos * -200,
            transitionDuration:this.props.speed+'s'
        }
        return (
            <div onMouseOver={()=>clearInterval(this.$timer)} onMouseOut={()=>this.play()} className="wrapper">
                <SliderItems images={images} style={style}/>
                <SliderArrows turn={this.turn.bind(this)} arrows={this.props.arrows}/>
                <SliderDots images={this.props.images} pos={this.state.pos} turn={this.turn.bind(this)} dots={this.props.dots}/>
            </div>
        )
    }
}