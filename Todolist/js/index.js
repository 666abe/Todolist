const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
// 簡略化して変数に入れている。



// ########## 追加 ###########
(function(){
    // 初期化処理
    // ローカルストレージに格納されている値を取得し、リストを生成する
    for(var key in localStorage){
        var html = localStorage.getItem(key);
        if (html) {
            list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    // null は、localStorage に保存しない
    if(html){
        // localStorage は、0 から始まる
        localStorage.setItem(task, html);
        return;
    }
    return;
}

const deleteTaskFromLocalStorage = task => {
    localStorage.removeItem(task);
    return;
}

// ###############################

const createTodoList = task => {
    // HTML テンプレートを生成
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
    // ########## 追加 ###########
    saveTaskToLocalStorage(task, html);
}

addTask.addEventListener('submit', e => {
  // 　ユーザーがクリックしたときに動作するところ！
  //    デフォルトのイベントを無効
    e.preventDefault();

    // タスクに入力した値を空白を除外して格納
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List の HTML を作成
        createTodoList(task);
        // タスクに入力した文字をクリア
        addTask.reset();
    }
});

// 削除機能
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        // ########## 追加 ###########
        const task = e.target.parentElement.textContent.trim()
        deleteTaskFromLocalStorage(task);
    }
});

const filterTasks = (term) => {

    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));

    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

search.addEventListener('keyup', () => {
    // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});
