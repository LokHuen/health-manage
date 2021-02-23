<template>
	<view class="qiun-columns">
		<view class="qiun-bg-white qiun-title-bar qiun-common-mt">
			<view class="qiun-title-dot-light">基本折线图</view>
		</view>
		<view class="qiun-charts">
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
	import uCharts from '../../plugins/stan-ucharts/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			getServerData() {

				let LineA = {
					categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
					series: [{
							name: '成交量A',
							data: [1, 1, 1, 1, 1, 1],
							color: '#facc14',
							type: 'area',
							style: 'curve'
						}, {
							name: '成交量B',
							data: [2, 2, 2, 2, 2, 2],
							color: '#2fc25b',
							type: 'area',
							style: 'curve'
						}, {
							name: '成交量C',
							data: [3, 3, 3, 3, 3, 3],
							color: '#1890ff',
							type: 'area',
							style: 'curve'
						},
						{
							"name": "点",
							"data": [1, 3, 10, 4, 2, 2],
							"type": "line",
							"color": "#f04864"
						}
					]
				};
				_self.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'mix',
					fontSize: 11,
					legend: {
						show: true
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						
						disableGrid: true,
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
											boundaryGap: true,
					},
					yAxis: {
						gridColor: 'red',
						disableGrid: true,
						gridType: 'dash',
						// gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 9,
						min: 0,
						max: 9,
						interval: 1,
						format: (val) => {
							return val.toFixed(0)
							
						},
						splitLine: {
							show: false
						},
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});

			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
