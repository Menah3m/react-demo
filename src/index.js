

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';



// 类组件
// 使用class定义个一个组件，可以包含多个方法

// 函数组件
// 如果组件中只有一个render()方法，且不含state，则使用函数组件会更简单
//   class Square extends React.Component {

//     render() {
//       return (
//         <button className="square" onClick={()=>this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }

  function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
  
  class Board extends React.Component {
    // 初始化board的state为一个长度为9的空值数组
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
        }
    }

    handleClick(i){
        //使用.slice()生成数组的副本，而不是直接在原对象上修改
        //有利于追踪历史变化
        const squares = this.state.squares.slice()
        squares[i] = 'X'
        this.setState({squares: squares})
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  