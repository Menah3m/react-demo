

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

// Square 组件
  function Square(props){
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    )
  }
  
// Board 组件
  class Board extends React.Component {
    // 初始化board的state为一个长度为9的空值数组
    constructor(props){
        super(props)
        this.state = {
            squares: Array(9).fill(null),
            // xIsNext来决定下一步是x还是o出手
            xIsNext: true,
        }
    }

    handleClick(i){
        //使用.slice()生成数组的副本，而不是直接在原对象上修改
        //有利于追踪历史变化
        const squares = this.state.squares.slice()
        
        if (calculateWinner(squares)|| squares[i]){
            return
        }

        squares[i] = this.state.xIsNext ? 'X':'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        })
    }

    renderSquare(i) {
      return <Square value={this.state.squares[i]} onClick={()=>this.handleClick(i)} />;
    }
  
    render() {
        const winner = calculateWinner(this.state.squares)
        let status
        if (winner){
            status = 'Winner: ' + winner
        } else{
            status = 'Next Player: '+ (this.state.xIsNext ? 'X' : 'O')
        }
  
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
  
// Game 组件
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
  
// calculateWinner 判断胜者
function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  