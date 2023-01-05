import {Router} from "express";
const router = Router();
let s = new Array(30000).fill(0);
s[22222] = 1073741824;
s[11112] = 134217728;
s[11121] = 134217728;
s[11211] = 134217728;
s[22220] = 262144 + 1024;
s[22202] = 262144 + 512;
s[22022] = 262144 + 256;
s[11120] = 262144;
s[11210] = 131072;
s[12110] = 131072;
s[21110] = 262144;
s[11102] = 262144;
s[11012] = 131072;
s[10112] = 131072;
s[11021] = 65536;
s[10211] = 65536;
s[10121] = 65536;
s[22200] = 32768;
s[22020] = 32768;
s[22002] = 8192;
s[20220] = 32768;
s[20202] = 8192;
s[2220] = 65536;
s[11002] = 2048;
s[11020] = 2048;
s[11200] = 2048;
s[12100] = 1024;
s[21100] = 2048;
s[10012] = 512;
s[10021] = 256;
s[10201] = 256;
s[10102] = 1024;
s[10120] = 1024;
s[10210] = 512;
s[12010] = 512;
s[21010] = 1024;
s[1120] = 2048;
s[1102] = 4096;
s[1210] = 1024;
s[22000] = 128;
s[20200] = 64;
s[20020] = 1<<5;
s[20002] = 1<<4;
s[2200] = 128;
s[2020] = 64;
s[21] = 8;
s[201] = 8;
s[2001] = 8;
s[12] = 8;
s[102] = 8;
s[1002] = 8;
s[120] = 8;
s[1200] = 8;
s[1020] = 8;
s[20000] = 4;
s[2000] = 4;
s[200] = 4;

function state_pts(a, b, c, d, e, target)
{
    let array = [a, b, c, d, e];
    let black = 0, white = 0;
    for(let i = 0; i < 5; i++)
    {
        if(array[i] === 1) black++;
        if(array[i] === 2) white++;
    }
    if(black > 0 && white > 0) return 0;
    array[target] = 2;
    let index = array[0]*10000 + array[1]*1000 + array[2]*100 + array[3]*10 + array[4];
    //console.log(index);
    if(s[index] !== 0) return s[index];
    index = array[4]*10000 + array[3]*1000 + array[2]*100 + array[1]*10 + array[0];
    return s[index];
}

function pts(board, r, c, size)
{
    if(board[r][c].value !== 0) return -1;
    let score = 0;
    for(let i = 0; i <= 4; i++)
    {
        if(r - 4 + i >= 0 && r + i < size)
        {
            score += state_pts(board[r-4+i][c].value, board[r-3+i][c].value, board[r-2+i][c].value, board[r-1+i][c].value, board[r+i][c].value, 4-i);
        }
    }
    for(let i = 0; i <= 4; i++)
    {
        if(c - 4 + i >= 0 && c + i < size)
        {
            score += state_pts(board[r][c-4+i].value, board[r][c-3+i].value, board[r][c-2+i].value, board[r][c-1+i].value, board[r][c+i].value, 4-i);
        }
    }
    for(let i = 0; i <= 4; i++)
    {
        if(r - 4 + i >= 0 && r + i < size && c -4 + i >= 0 && c + i < size)
        {
            score += state_pts(board[r-4+i][c-4+i].value, board[r-3+i][c-3+i].value, board[r-2+i][c-2+i].value, board[r-1+i][c-1+i].value, board[r+i][c+i].value, 4-i);
        }
    }
    for(let i = 0; i <= 4; i++)
    {
        if(r - 4 + i >= 0 && r - 4 + i < size && r + i < size && c + 4 - i >= 0 && c + 4 - i < size && c - i >= 0)
        {
            score += state_pts(board[r-4+i][c+4-i].value, board[r-3+i][c+3-i].value, board[r-2+i][c+2-i].value, board[r-1+i][c+1-i].value, board[r+i][c-i].value, 4-i);
        }
    }
    return score;
}

router.get("/AI", async(req, res) =>{
    console.log("callAI");
    console.log("boardSize = ");
    console.log(req.query.boardSize);
    const board = req.query.board;
    const size = req.query.boardSize;
    // console.log(board);
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            board[i][j].value = Number(board[i][j].value);
            board[i][j].x = Number(board[i][j].x);
            board[i][j].y = Number(board[i][j].y);
        }
    }
    //console.log(size);
    let val = -1073741824;
    let x = 0, y = 0;
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            let point = pts(board, i, j, size);
            //console.log(i, j, point);
            if(point > val)
            {
                x = i;
                y = j;
                val = point;
            }
        }
    }
    res.json({
        x: x,
        y: y,
    });
});

router.get("/gameOver", async(req, res) => {
    console.log("check");
    const board = req.query.board;
    const size = req.query.boardSize;
    console.log("check game size: ");
    console.log(size);
    let type = 0;
    let flag = 0;
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size; j++)
        {
            //console.log(flag);
            if(board[i][j].value === '0') flag = 1;
        }
    }
    if(flag === 0)
    {
        /*res.json({
            message: 'Tie game!',
            status: 3
        });
        return;*/
        type = 3;
    }
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size - 4; j++)
        {
            if(board[i][j].value === '1' && board[i][j+1].value === '1' && board[i][j+2].value === '1' && board[i][j+3].value === '1' && board[i][j+4].value === '1')
            {
                /*res.json({
                    message: 'You win!',
                    status: 1
                });
                return;*/
                type = 1;
            }
            if(board[i][j].value === '2' && board[i][j+1].value === '2' && board[i][j+2].value === '2' && board[i][j+3].value === '2' && board[i][j+4].value === '2')
            {
                /*res.json({
                    message: 'You lose!',
                    status: 2
                });
                return;*/
                type = 2;
            }
        }
    }
    for(let i = 0; i < size; i++)
    {
        for(let j = 0; j < size - 4; j++)
        {
            if(board[j][i].value === '1' && board[j+1][i].value === '1' && board[j+2][i].value === '1' && board[j+3][i].value === '1' && board[j+4][i].value === '1')
            {
                /*res.json({
                    message: 'You win!',
                    status: 1
                });
                return;*/
                type = 1;
            }
            if(board[j][i].value === '2' && board[j+1][i].value === '2' && board[j+2][i].value === '2' && board[j+3][i].value === '2' && board[j+4][i].value === '2')
            {
                /*res.json({
                    message: 'You lose!',
                    status: 2
                });
                return;*/
                type = 2;
            }
        }
    }
    for(let i = 0; i < size - 4; i++)
    {
        for(let j = 0; j < size - 4; j++)
        {
            if(board[i][j].value === '1' && board[i+1][j+1].value === '1' && board[i+2][j+2].value === '1' && board[i+3][j+3].value === '1' && board[i+4][j+4].value === '1')
            {
                /*res.json({
                    message: 'You win!',
                    status: 1
                });
                return;*/
                type = 1;
            }
            if(board[i][j].value === '2' && board[i+1][j+1].value === '2' && board[i+2][j+2].value === '2' && board[i+3][j+3].value === '2' && board[i+4][j+4].value === '2')
            {
                /*res.json({
                    message: 'You lose!',
                    status: 2
                });
                return;*/
                type = 2;
            }
        }
    }
    for(let i = 0; i < size - 4; i++)
    {
        for(let j = 4; j < size; j++)
        {
            if(board[i][j].value === '1' && board[i+1][j-1].value === '1' && board[i+2][j-2].value === '1' && board[i+3][j-3].value === '1' && board[i+4][j-4].value === '1')
            {
                /*res.json({
                    message: 'You win!',
                    status: 1
                });
                return;*/
                type = 1;
            }
            if(board[i][j].value === '2' && board[i+1][j-1].value === '2' && board[i+2][j-2].value === '2' && board[i+3][j-3].value === '2' && board[i+4][j-4].value === '2')
            {
                /*res.json({
                    message: 'You lose!',
                    status: 2
                });
                return;*/
                type = 2;
            }
        }
    }
    //console.log(size);
    //console.log(board);

    if(type === 0)
    {
        res.json({
            message: 'keep going...',
            status: 0,
        });
    }
    else if(type === 1)
    {
        res.json({
            message: 'You win! You earn 50 coins!',
            status: 1,
        });
    }
    else if(type === 2)
    {
        res.json({
            message: 'You lose! You earn 10 coins!',
            status: 2,
        });
    }
    else if(type === 3)
    {
        res.json({
            message: 'Tie game. You earn 20 coins!',
            status: 3,
        });
    }
});

export default router;