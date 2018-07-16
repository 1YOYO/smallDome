/*
* @Author: YOYO
* @Date:   2018-07-13 11:16:06
* @scripts: 游戏的核心模块，主要功能有：
* @scri
*/

var Game = function () {
	// dom元素
  var gameDiv;
  var nextDiv;
  var timeDiv;
  var scoreDiv;
  var gameOver;
  // 分数
  var score = 0;
  var gameData = [
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];
	// 当前方块
	var cur;
	// 下一个方块
	var next;
	// divs-每个小方块
	var nextDivs = [];
	var gameDivs = [];
	/* 初始化div小方格 */
	var initDiv = function (container, data, divs) {
	  for (var i = 0; i < data.length; i++) {
	    var div = []
	    for (var j = 0; j < data[0].length; j++) {
	    	var newNode = document.createElement('div');
	    	newNode.className = 'none';
	    	newNode.style.top = (i * 20) + 'px'; // 每一块的位置
	    	newNode.style.left = (j * 20) + 'px';
	    	container.appendChild(newNode);
	    	div.push(newNode);
	    }
	    divs.push(div);
	  }
	};
	/* 刷新个别小方格的颜色 */
	var refreshDiv = function (data, divs) {
		for (var i = 0; i < data.length; i++) {
	    for (var j = 0; j < data[0].length; j++) {
	    	if (data[i][j] == 0) {
	    		divs[i][j].className = 'none'
	    	} else if (data[i][j] == 1) {
	    		divs[i][j].className = 'done'
	    	} else if (data[i][j] == 2) {
	    		divs[i][j].className = 'current'
	    	}
	    }
	  }
	};
	// 检测点是否合法
	var check = function (pos, x, y) {
		if (pos.y + y < 0) {
			return false;
		} else if (pos.y + y >= gameData.length) {
			return false;
		} else if (pos.x + x < 0) {
			return false;
		} else if (pos.x + x >= gameData[0].length) {
			return false;
		} else if (gameData[pos.y + y][pos.x + x] == 1) {
			return false
		} else {
			return true
		}
	}
	// 检测数据是否合法
	var isValid = function (pos, data) {
    for (var i = 0; i < data.length; i++) {
	    for (var j = 0; j < data[0].length; j++) {
	    	if (data[i][j] != 0 ) {
		    	if (!check(pos, j, i)) {
		    		return false;
		    	}
	    	}
	    }
	  }
	  return true
	}
	// 清除数据
	var clearData = function () {
		for (var i = 0; i < cur.data.length; i++) {
	    for (var j = 0; j < cur.data[0].length; j++) {
	    	if (check(cur.origin, j, i)) {
		    	gameData[cur.origin.y + i][cur.origin.x + j] = 0
	    	}
	    }
	  }
	}
	// 设置数据
	var setData = function () {
		for (var i = 0; i < cur.data.length; i++) {
	    for (var j = 0; j < cur.data[0].length; j++) {
	    	if (check(cur.origin, j, i)) {
		    	gameData[cur.origin.y + i][cur.origin.x + j] = cur.data[i][j]
	    	}
	    }
	  }
	}
	// 下移
	var down = function () {
		if (cur.canDown(isValid)) {
			clearData();
			cur.down();
			setData();
			refreshDiv(gameData, gameDivs);
			return true;
		} else {
			return false;
		}
	}
	// 左移
	var left = function () {
		if (cur.canLeft(isValid)) {
			clearData();
			cur.left();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	// 右移
	var right = function () {
		if (cur.canRight(isValid)) {
			clearData();
			cur.right();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
	// 旋转
	var rotate = function () {
		if (cur.canRotate(isValid)) {
			clearData();
			cur.rotate();
			setData();
			refreshDiv(gameData, gameDivs);
		}
	}
  // 方块移动到底部时固定
  var fixed = function () {
    for (var i = 0; i < cur.data.length; i++) {
	    for (var j = 0; j < cur.data[0].length; j++) {
	    	if (check(cur.origin, j, i)) {
	    		if (gameData[cur.origin.y + i][cur.origin.x + j] == 2) {
	    			gameData[cur.origin.y + i][cur.origin.x + j] = 1;
	    		}
	    	}
	    }
	  }
	  refreshDiv(gameData, gameDivs);
  }
  // 清除当前行
	var checkClear = function () {
		var line = 0
		for (var i = 0; i < gameData.length; i++) {
			var clear = true
			for (var j = 0; j < gameData[0].length; j++) {
				if (gameData[i][j] == 0) {
					clear = false
				}
			}
			if (clear) {
				gameData.splice(i, 1)
				gameData.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
				line += 1
			}
		}
		return line
	}
  // 判断游戏结束
	var checkGameOver = function () {
		var gemeOver = false
		for (var i = 0; i < gameData[0].length; i++) {
      if (gameData[1][i] == 1) {
	      gemeOver = true
      }
		}
		return gemeOver;
	}
  // 下一个方块
	var performNext = function (type, dir) {
		cur = next;
		setData();
		next = SquareFactory.prototype.make(type, dir);
		refreshDiv(gameData, gameDivs);
		refreshDiv(next.data, nextDivs);
	}
	// 设置时间
	var setTime = function (time) {
    timeDiv.innerHTML = time;
	}
	// 加分
	var addScore = function (line) {
    var s = 0;
    if (line < 5) {
      score = 10 * line
    } else {
      score = 10 * line + 200
    }
    scoreDiv.innerHTML = score
	}
	// 游戏结束info
	var gameOver = function (win) {
    if (win) {
      gameOver.innerHTML = '你赢了';
    } else {
      gameOver.innerHTML = '你输了';
    }
	}
	// 底部增加行
	var addTailLine = function(line) {
		gameData.splice(gameData.length - 1, 1)
		gameData.push(line);
		refreshDiv(gameData, gameDivs);
	}
	/* 初始化 */
	var init = function (doms, type, dir) {
		gameDiv = doms.gameDiv
		nextDiv = doms.nextDiv
		timeDiv = doms.timeDiv
		scoreDiv = doms.scoreDiv
		gameOver = doms.gameOver
		// cur = SquareFactory.prototype.make(2, 0);
		next = SquareFactory.prototype.make(type, dir);
		initDiv(gameDiv, gameData, gameDivs);
		initDiv(nextDiv, next.data, nextDivs);
		// setData();
		// refreshDiv(gameData, gameDivs);
		refreshDiv(next.data, nextDivs);
	}
	// 导出API
	this.init = init;
	this.down = down;
	this.right = right;
	this.left = left;
	this.rotate = rotate;
	this.fall = function () {while(down());}
	this.fixed = fixed;
	this.performNext = performNext;
	this.checkClear = checkClear;
	this.checkGameOver = checkGameOver;
	this.setTime = setTime;
	this.addScore = addScore;
	this.gameOver = gameOver;
	this.addTailLine = addTailLine;
}