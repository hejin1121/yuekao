define(['mui', 'BScroll'], (mui, BScroll) => {
    let page = 1;
    let limit = 10;
    let skip = (page - 1) * limit
    console.log(skip)
    let [a, b] = [
        [],
        []
    ];
    let scroll = null;
    let flage = false;

    function init() {
        mui.init();
        scroll = new BScroll('.content', {
            probeType: 2
        })
        getData(skip, limit);
        loding();
        addEvent()
    }
    //绑定事件
    function addEvent() {
        const shop = document.querySelector('.header-right');
        shop.onclick = () => {
            location.href = 'addBill.html'
        }
    }
    //请求数据
    function getData(skip, limit) {
        mui.ajax('/api/getData', {
            data: {
                limit: limit,
                skip: skip
            },
            success(rs) {

                render(waterfull(rs.data))
            }
        })
    }
    //渲染数据
    function render(data) {
        const list = [...document.querySelectorAll('.list')];
        data.forEach((item, i) => {
            list[i].innerHTML = item.map(file => {
                return `<dl>
							<dt style="height:${file.imgH}px"><img src="${file.imgs}" alt=""></dt>
							<dd>
								<div>${file.title}</div>
								<p>${file.name}<span class="${file.type === '现货' ? 'active':'actives'}">${file.type}</span></p>
							</dd>
						</dl>`
            }).join('');
        })
        scroll.refresh();
    }
    //格式化数据，给数据分类
    function waterfull(data) {
        data.forEach((item, i) => {
            if (!a.length) {
                a.push(item);
                return;
            } else if (!b.length) {
                b.push(item);
                return;
            }
            if (a.reduce((s, e) => s + e.imgH, 0) < b.reduce((m, n) => m + n.imgH, 0)) {
                a.push(item)
            } else {
                b.push(item)
            }
        })
        return [a, b]
    }
    //加载数据
    function loding() {
        let lodingH = document.querySelector('.loding');

        scroll.on('scroll', function() {

            if (this.y < this.maxScrollY - 40) {
                lodingH.innerHTML = '释放加载';
                flage = true;
            } else {
                lodingH.innerHTML = '上拉加载';
                flage = false;
            }
        })
        scroll.on('scrollEnd', function() {
            if (flage) {
                if (lodingH.innerHTML = '释放加载') {
                    page++;
                    skip = Math.ceil((page - 1) * limit);
                    getData(skip, limit)
                } else {
                    lodingH.innerHTML = '没有更多数据了'
                }
            }
        })
    }
    init()
})