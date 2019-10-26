const addTask = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
// �ȗ������ĕϐ��ɓ���Ă���B



// ########## �ǉ� ###########
(function(){
    // ����������
    // ���[�J���X�g���[�W�Ɋi�[����Ă���l���擾���A���X�g�𐶐�����
    for(var key in localStorage){
        var html = localStorage.getItem(key);
        if (html) {
            list.innerHTML += localStorage.getItem(key);
        }
    }
})();

const saveTaskToLocalStorage = (task, html) => {
    // null �́AlocalStorage �ɕۑ����Ȃ�
    if(html){
        // localStorage �́A0 ����n�܂�
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
    // HTML �e���v���[�g�𐶐�
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    list.innerHTML += html;
    // ########## �ǉ� ###########
    saveTaskToLocalStorage(task, html);
}

addTask.addEventListener('submit', e => {
  // �@���[�U�[���N���b�N�����Ƃ��ɓ��삷��Ƃ���I
  //    �f�t�H���g�̃C�x���g�𖳌�
    e.preventDefault();

    // �^�X�N�ɓ��͂����l���󔒂����O���Ċi�[
    const task = addTask.add.value.trim();
    if(task.length) {
        // Todo List �� HTML ���쐬
        createTodoList(task);
        // �^�X�N�ɓ��͂����������N���A
        addTask.reset();
    }
});

// �폜�@�\
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')){
        e.target.parentElement.remove();
        // ########## �ǉ� ###########
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
    // �󔒍폜���A�������ɕϊ�(�啶���E�������̋�ʂ��Ȃ���)
    const term = search.value.trim().toLowerCase();
    filterTasks(term);
});
