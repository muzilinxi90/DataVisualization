// 轨迹图线路数据
var coords = [
    [113.317568, 23.135959],
    [113.317783, 23.135278],
    [113.321489, 23.135432],
    [113.321525, 23.135282],
    [113.321592, 23.13517],
    [113.321799, 23.135083],
    [113.322158, 23.135141],
    [113.322374, 23.135378],
    [113.321992, 23.135847],
    [113.322243, 23.13949],
    [113.322396, 23.1397],
    [113.328163, 23.13943],
    [113.334945, 23.139033],
    [113.334658, 23.133217],
    [113.33313, 23.13222],
    [113.328755, 23.137588]
];

// 轨迹图关键点数据
var positionData = [{
    name: 'XX街',
    value: [113.317568, 23.135959, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.317783, 23.135278, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.321489, 23.135432, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.321525, 23.135282, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.321592, 23.13517, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.321799, 23.135083, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.322158, 23.135141, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.322374, 23.135378, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.321992, 23.135847, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.322243, 23.13949, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.322396, 23.1397, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.328163, 23.13943, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.334945, 23.139033, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.334658, 23.133217, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.33313, 23.13222, 'otherInfo']
}, {
    name: 'XX街',
    value: [113.328755, 23.137588, 'otherInfo']
}];


/**
 * 根据路线的全部坐标点计算路线外切矩形的中心点即地图定位的中心点
 * @param  {二维数组} coords [coords[i][0]为经度，coords[i][1]为维度]
 * @return {数组}           [中心点坐标]
 */
function getCenterPoint(coords) {
    var centerPoint = [];
    if (coords.length !== 0) {
        var minLon = coords[0][0];
        var maxLon = coords[0][0];
        var minLat = coords[0][1];
        var maxLat = coords[0][1];
        for (var i = 1; i < coords.length; i++) {
            if (coords[i][0] < minLon) {
                minLon = coords[i][0];
            } else if (coords[i][0] > maxLon) {
                maxLon = coords[i][0];
            }
            if (coords[i][1] < minLat) {
                minLat = coords[i][1];
            } else if (coords[i][1] > maxLat) {
                maxLat = coords[i][1];
            }
        }
        centerPoint = [(minLon + maxLon) / 2, (minLat + maxLat) / 2];
    }
    return centerPoint;
}


$(function() {
    var chart = echarts.init(document.getElementById('main'));

    option = {
        bmap: {
            center: [104.40, 30.67],
            roam: true
        },
        // 线路用lines，标记位置用effectScatter或scatter
        series: [{
            type: 'lines',
            name: '多人轨迹Demo',
            coordinateSystem: 'bmap',
            polyline: true,
            effect: {
                show: true,
                period: 20,
                delay: 0,
                constantSpeed: 0,
                symbol: 'path://M949.6125 512c-28.05 0-90.35 0-209.4625 0-46.7125 0-18.4375-110.9-55.8125-146.825l-114.6375 197.425 170.45 160.2125L560.6125 1024c0 0-61.7-41.2875-59.85-60.2375 4.1125-42.05 95.35-159.0625 120.5875-206.0125-57.0375-53.625-135.2125-127.125-143.6875-135.0875l-12.5375-7.375-113.9625 137.65-59.85 0-59.85 0L81.85 752.9375l-29.925-30.125 0-30.1125 29.925-30.1125 209.4625 0 0 1.275 81.9125-121.9375 0.475 0.1125L532.8875 267.875c-66.0625-32.7375-103.125-29.2625-133.1125 3.1875-111.6875 120.875-123.4375 60.2375-138.3875 60.2375-14.9625 0-13.0875-39.525 0-60.2375 13.0875-20.7 102.625-185.8 329.15-90.35C805.1125 271.125 753.7625 419.7625 800 421.65c92.6125 9.4625 121.5625 18.825 149.6125 30.125C977.6625 463.0625 981.4 489.4125 949.6125 512zM755.1125 210.825c-57.8375 0-104.725-47.2-104.725-105.4125S697.275 0 755.1125 0c57.8375 0 104.725 47.1875 104.725 105.4125S812.95 210.825 755.1125 210.825z',
                symbolSize: 30,
                color: '#f00',
                trailLength: 0,
                loop: true
            },
            symbol: ['path://M64,0C39.699,0,20,19.699,20,44s44,84,44,84s44-59.699,44-84S88.301,0,64,0z M28,44C28,24.148,44.148,8,64,8s36,16.148,36,36c0,13.828-20.008,47.211-36,70.238C48.008,91.211,28,57.828,28,44z M64,24c-11.047,0-20,8.953-20,20s8.953,20,20,20s20-8.953,20-20S75.047,24,64,24z M64,56c-6.617,0-12-5.383-12-12s5.383-12,12-12s12,5.383,12,12S70.617,56,64,56z', 'path://M64,0C39.699,0,20,19.699,20,44s44,84,44,84s44-59.699,44-84S88.301,0,64,0z M28,44C28,24.148,44.148,8,64,8s36,16.148,36,36c0,13.828-20.008,47.211-36,70.238C48.008,91.211,28,57.828,28,44z M64,24c-11.047,0-20,8.953-20,20s8.953,20,20,20s20-8.953,20-20S75.047,24,64,24z M64,56c-6.617,0-12-5.383-12-12s5.383-12,12-12s12,5.383,12,12S70.617,56,64,56z'],
            symbolSize: [10, 10],
            lineStyle: {
                normal: {
                    color: '#f00',
                    width: 3,
                    type: 'solid',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowOffsetX: 5,
                    shadowOffsetY: 5,
                    opacity: 0.6,
                },
                emphasis: {

                }
            },
            data: [{
                name: '嫌疑人1的逃跑路线',
                coords: coords,
                lineStyle: {
                    normal: {

                    },
                    emphasis: {

                    }
                }
            }],
            zlevel: 1,
            animation: false
        }, {
            type: 'effectScatter',
            name: '轨迹结点',
            showEffectOn: 'emphasis',
            rippleEffect: {
                period: 4,
                scale: 2.5,
                brushType: 'stroke'
            },
            coordinateSystem: 'bmap',
            symbol: 'path://M64,0C39.699,0,20,19.699,20,44s44,84,44,84s44-59.699,44-84S88.301,0,64,0z M28,44C28,24.148,44.148,8,64,8s36,16.148,36,36c0,13.828-20.008,47.211-36,70.238C48.008,91.211,28,57.828,28,44z M64,24c-11.047,0-20,8.953-20,20s8.953,20,20,20s20-8.953,20-20S75.047,24,64,24z M64,56c-6.617,0-12-5.383-12-12s5.383-12,12-12s12,5.383,12,12S70.617,56,64,56z',
            symbolSize: 25,
            symbolRotate: 0,
            symbolOffset: [0, -12],
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{b}',
                    textStyle: {
                        color: '#ddb926',
                        fontSize: 16
                    }
                },
                emphasis: {

                }

            },
            itemStyle: {
                normal: {
                    color: '#ddb926'
                },
                emphasis: {

                }
            },
            data: positionData,
            zlevel: 2
        }]
    };

    chart.setOption(option);
    var centerPoint = getCenterPoint(coords);
    var point = new BMap.Point(centerPoint[0], centerPoint[1]);
    var map = chart.getModel().getComponent('bmap').getBMap();
    map.centerAndZoom(point, 17);
    map.enableScrollWheelZoom(true);
    map.setMapStyle({
        style: 'midnight'
    });
});
