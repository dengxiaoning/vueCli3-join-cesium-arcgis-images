<template>
    <div ref="cesiumContainer"></div>
</template>

<script>

    export default {
        data () {
            return {
                viewer :'',
            }
        },
        mounted (){
            this.mapInit();
        },
        methods:{
            printCamerInfo(){
                var _this = this;
                document.onkeydown = function (event) {
                    var e = event || window.event
                    if (e.ctrlKey && e.keyCode == 13) {
                        var camera = _this.viewer.scene.camera;
                        var heading = camera.heading;
                        var pitch = camera.pitch;
                        var roll = camera.roll;
                        var pos = camera.position;
                        console.log("选择弧度(heading,pitch,roll): heading:" + heading + ",pitch:" + pitch + ",roll:" + roll + "")

                        console.log("位置（x,y,z）   " + pos.x + "," + pos.y + "," + pos.z)
                    }
                }
            },

            /**
             *
             * 创建 模型
             * @param viewer
             * @param url
             * @param x
             * @param y
             * @param height
             */
            createModelToMap(viewer,url, x, y, height) {
                var position = Cesium.Cartesian3.fromDegrees(x, y, height);
                viewer.entities.add({
                    name: url,
                    position: position,
                    model: {
                        uri: url,
                        minimumPixelSize: 128
                    }
                });
            },
            cameraflyToDestination(){
                // 相机飞入
                this.viewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(103.37324413479338,29.544684360197113,83450),
                    orientation : {
                        heading : Cesium.Math.toRadians(0.049206089012050924),
                        pitch : Cesium.Math.toRadians(-90),
                        roll : 0.00023724144623749055
                    }
                });
            },
            mapInit(){
                // var lonIncrement = 0.00025;
                var initialLon = 103.33;
                var lat = 30.06;
                var height = 857;
              //  选择弧度(heading,pitch,roll): heading:1.2006535190271945,pitch:-1.0517187949445024,roll:0.005473884215137836
                //cesium_main.vue?4b82:157 经度103.32, 纬度29.92高度 1493
                // 峨眉 山 经度103.33, 纬度30.06高度 857
                //经度103.33, 纬度29.52高度 4124

                let cesiymEntiyDom = this.$refs.cesiumContainer;
                // // 创建viewer实例
                this.viewer = new Cesium.Viewer(cesiymEntiyDom, {
                    // 需要进行可视化的数据源的集合
                    animation: false, // 是否显示动画控件
                    shouldAnimate: true,
                    homeButton: false, // 是否显示Home按钮
                    fullscreenButton: false, // 是否显示全屏按钮
                    baseLayerPicker: false, // 是否显示图层选择控件
                    geocoder: false, // 是否显示地名查找控件
                    timeline: false, // 是否显示时间线控件
                    sceneModePicker: false, // 是否显示投影方式控件
                    navigationHelpButton: false, // 是否显示帮助信息控件
                    infoBox: false, // 是否显示点击要素之后显示的信息
                    requestRenderMode: false, // 启用请求渲染模式
                    scene3DOnly: true, // 每个几何实例将只能以3D渲染以节省GPU内存
                    sceneMode: 3, // 初始场景模式 1 2D模式 2 2D循环模式 3 3D模式  Cesium.SceneMode
                    fullscreenElement: document.body, // 全屏时渲染的HTML元素 暂时没发现用处

                })

                // 去除版权信息
                this.viewer._cesiumWidget._creditContainer.style.display = 'none';


                // Cartesian 方式确定位置
                this.viewer.camera.setView({
                    destination :  Cesium.Cartesian3.fromDegrees(initialLon,lat,height), // 设置位置
                    orientation: {
                        heading : Cesium.Math.toRadians(0.049206089012050924), // 方向
                        pitch : Cesium.Math.toRadians(-45.0),// 倾斜角度
                        roll : 0.00023724144623749055
                    }
                });

                // var layers = this.viewer.scene.imageryLayers;

                // let arcgis_layer = new Cesium.WebMapServiceImageryProvider({
                //     url: "http://localhost:28080/geowebcache/service/wms",
                //     layers: 'EPSG:4326_fsRoads',
                //     parameters: {
                //         'LAYERS': 'fsRoads',
                //         'FORMAT': 'image/png',
                //         'SRS': 'EPSG:4326',
                //         'VERSION': '1.1.1'
                //     }
                // });
                // layers.addImageryProvider(arcgis_layer);

                //左下角坐标，右上角坐标
                // var rectangle=Cesium.Rectangle.fromDegrees(102.05,28.51,-90,83450);
                // layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
                //     url:"images/bgConvert.png",
                //     rectangle:  rectangle
                // }));

                // 加载模型到地图
                // this.createModelToMap(this.viewer,'modelData/CesiumMilkTruck.gltf', initialLon - lonIncrement, lat, height - 70.5);
                let selft  = this;
                const scene = this.viewer.scene;
                // var canvas = scene.canvas;
                var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
                handler.setInputAction(function(movement) {
                    var cartesian = scene.camera.pickEllipsoid(movement.endPosition, ellipsoid);
                    var ellipsoid = scene.globe.ellipsoid;
                    if (cartesian) { //能获取，显示坐标
                        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
                        var coords = '经度' + Cesium.Math.toDegrees(cartographic.longitude).toFixed(2) + ', ' + '纬度' + Cesium.Math.toDegrees(
                            cartographic.latitude).toFixed(2) + '高度 ' + Math.ceil(selft.viewer.camera.positionCartographic.height);
                        console.log(coords) ;

                    } else { //不能获取不显示

                    }
                }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            },
        },
    }



</script>
<style>

</style>
