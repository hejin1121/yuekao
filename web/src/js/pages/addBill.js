define(['mui'], (mui) => {
    let ind = 0;
    let tupian = [...document.querySelectorAll('#tupian img')];
    let type = [...document.querySelectorAll('.type span')];

    function init() {
        mui.init();
        addEvent();
        imgs();
        render();
    }

    function render() {}
    //绑定事件
    function addEvent() {
        const buttons = document.querySelector('#button');

        buttons.addEventListener('tap', add);
        mui('#tupian').on('tap', 'img', imgs);
        mui('#type').on('tap', 'span', types)
    }
    //点击创建进行添加    
    function add() {
        //title
        let huatype = document.getElementById('huatype').value.trim();
        //name
        let pinlei = document.getElementById('pinlei').value.trim();
        //imgH
        let widths = document.getElementById('width').value.trim();
        let urls = tupian.filter(file => file.className === 'active');
        //imgs
        let srcs = urls[0].getAttribute('src');
        let t = type.filter(file => file.className === 'add');
        //type
        let typeH = t[0].innerHTML;
        mui.ajax('/api/addBill', {
            type: 'post',
            data: {
                title: huatype,
                name: pinlei,
                imgH: widths,
                imgs: srcs,
                type: typeH
            },
            success(rs) {
                console.log(rs)
            }
        })



    }

    function imgs() {
        // console.log(this)

        tupian[ind].classList.remove('active')
        this.classList.add('active');
        ind = this.getAttribute('data-index')

    }

    function types() {
        ind = 0;
        type[ind].classList.remove('add')
        this.classList.add('add');
        ind = this.getAttribute('data-index')
    }
    init()
})