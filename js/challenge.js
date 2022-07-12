const counter = document.getElementById('counter')
const increment = document.getElementById('plus')
const decrement = document.getElementById('minus')
const pause = document.getElementById('pause')
const heart = document.getElementById('heart')
const commentForm = document.getElementById('comment-form')
const submitComment = document.getElementById('submit')
const commentList = document.getElementById('list')
const likesList = document.querySelector('.likes')

let timer 
let currentNum = 0

const counterMod = (value)=>{
    currentNum += value
    counter.textContent = currentNum
    // console.log(currentNum)
}

const startCount= ()=>{
    return setInterval(()=>counterMod(1), 1000)
}

increment.addEventListener('click', () => { counterMod(1) })
decrement.addEventListener('click', () => { counterMod(-1) })

pause.addEventListener('click', () => {
    increment.toggleAttribute('disabled')
    decrement.toggleAttribute('disabled')
    heart.toggleAttribute('disabled')
    submitComment.toggleAttribute('disabled')

    if (pause.classList.contains('paused')) {
        timer = startCount()
        pause.classList.remove('paused')
        pause.textContent = 'Pause'
    }
    else {
        clearInterval(timer)
        pause.classList.add('paused')
        pause.textContent = 'Resume'
    }
})

commentForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let li = document.createElement('li')
    li.textContent = commentForm.comment.value
    li.setAttribute('data-value',currentNum)
    commentList.append(li)
})

heart.addEventListener('click',()=>{
    let li = document.querySelector(`#likes-${currentNum}`)
    if(li){
        let likesSpan = document.querySelector(`#likes-${currentNum} span`)
        let likesCount = parseInt(likesSpan.innerHTML) +1 
        li.innerHTML = `${currentNum} has been liked <span>${likesCount}</span> times`
    }
    else{
    li = document.createElement('li')
    li.id = 'likes-'+currentNum
    li.innerHTML=`${currentNum} has been liked <span>1</span> time`
    likesList.append(li)
}
})

window.addEventListener('DOMContentLoaded',()=>{
    timer = startCount()
})