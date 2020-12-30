<template>
	<view class="container">
		<scroll-view class="i-scroll-view" scroll-y="">
			<view class="flex i-content">
				<image class="i-head-img" style="width: 100vh;height: 420rpx;" src="../../static/auth/1.png"></image>
				<text class="i-head-tip">均衡饮食是基于中国居民膳食指南建议，最大程度上满足人体各类营养需求的饮食计划。合理饮食的基础上，应保证膳食多样性，每日食物摄入12种以上，平均每周25种以上。
				</text>
				<view class="flex i-target-box">
					<view class="flexc i-left">
						<text style="font-weight: bold;color: #333333;">营养目标</text>
						<view class="flex i-target-item" style="align-items: center;margin-top: 22rpx;">
							<image class="i-dot"></image>
							<text>脂肪60g</text>
						</view>
						<view class="flex i-target-item" style="align-items: center;">
							<image class="i-dot"></image>
							<text>脂肪60g</text>
						</view>
						<view class="flex i-target-item" style="align-items: center;">
							<image class="i-dot"></image>
							<text>碳水化合物225g</text>
						</view>
					</view>
					<view class="i-space-line"></view>
					<view class="flexc i-right">
						<view style="margin: 0 auto;">
							<view class="flex">
								<text style="font-size: 46rpx; align-self: flex-start;">1800</text>
								<text style="align-self: flex-end; margin-left: 10rpx;margin-right: 5rpx;">kcal</text>
								<image style="width: 22rpx; height: 22rpx;" src="../../static/icon/wenhaoIcon.png"></image>
							</view>
							<text>每日总能量</text>
						</view>
					</view>
				</view>
				<view class="flexc i-text-box" v-if="!forType">
					<view class="flex i-title-box">
						<text style="font-size: 28rpx; color: #333333;font-weight: bold;flex: 1;">食谱 | 乳腺癌患者</text>
						<view class="flex" style="align-items: center;justify-content: center;" @click="toMore">
							<text>全部食谱</text>
							<image style="width: 12rpx; height: 22rpx;margin-left: 10rpx;" src="../../static/icon/more_icon.png"></image>
						</view>
					</view>
					<text class="i-text">
						乳腺癌的发生与卵巢功能失常、遗传、
						独身、不孕、不哺乳或哺乳不正常等因素有关,故在日常生活中应经常食用抗癌、抗肿瘤的食品和菜肴。可选用对卵巢功能有调节作用的食品,可选用抗复发及增强免疫作用的食品,对乳房局部溃疡者应选用抗炎、抗溃疡的食品。
						一、主食的选择
						主食应选择易于消化的米面制品,如软火饭、发面馒头、 面条、面筋等。
						二、肉食的选择
						具有抗癌抗肿瘤作用的肉食有蛇肉、海蟹、牡师等。可调节卵巢功能有乌骨鸡、海参等。可增强免疫力、抗复发的有蟹、青鱼、对虾、蛙肉等。此外,针鱼、鲫鱼、带鱼、海鳗等具有抗感染作用。以上肉食,均可针对乳腺癌病情选用。
						三、蔬菜的选择
						丝瓜、萝卜、交白、莲藕、冬瓜、石花菜、海蒿子、芦笋、海带、南瓜、洋葱、韭菜、大蒜、菜豆、香菇具有增强免疫力,防止癌肿复发的作用,可常食用。
						四、水果的选择
						各种富含维生素的水果均对乳腺癌有益,除此之外还可相应选择具有治疗作用的水果。如橘子、橙子等具有止痛、防乳头回缩的作用,栗子、猕猴桃、大枣、苹果、葡萄等具有提高免疫力,预防肿瘤复发的作用。
						乳香蛋丁
						【主料】牛奶450毫升、鸡蛋 2个
						【配料】青豆50克,淀粉50 克,猪油30克,乳香1.5克,盐、 味精各适量。
						【制作方法】(1)牛奶中加入乳香、蛋清、盐、味精, 调芡。(2)蛋黄搅匀,加盐后蒸熟，切成小丁;青豆洗净，入油锅煸炒至熟,盛出。(3)再将锅烧热加入猪油,倒入牛奶浆,翻炒成粥状,起锅装盘，撒上蛋黄丁和青豆即成。
						【服法法与用量】佐餐，食量不限。
						【功效】理气活血,滋阴润燥。
						【食谱分析】牛奶、鸡蛋补虚润燥;研究证明,牛奶制品对乳腺癌有预防作用。乳香性温味辛,活血通经,行气止痛。青豆通乳消胀,抗癌防癌。此方补虚通经止痛,尤宜于乳腺癌乳房胀痛、上肢肿痛者。
						【禁忌】有感染发热者慎用。
						鲜蘑炒豌豆
						【主料】鲜口蘑100克、鲜嫩豌豆150克。
						【配料】酱油、食油、盐各适量。
						【制作方法】(1)豌豆剥好;鲜磨蘑洗净,切成小丁。(2)熬热油锅, 把鲜蘑丁、豌豆、酱油、盐等一同放入,用旺火快炒,炒熟即成。
						【功效】健脾和胃,利湿解毒,通气消肿。
						【食谱分析】《食物本草会慕》中曰:鲜蘑"调营卫,益中平气。治消渴,煮食治寒热,除吐逆,止泄痢,利小便,腹胀满,下乳汁”。生津,止渴下气通乳消胀"。现代研究认为,鲜蘑与豌豆均有抗癌作用。二者合用,益气和中,清热利湿,解毒抗癌。适宜于乳腺癌患者。本品青白相间,清脆味鲜。
						【禁忌】大使稀溏者慎用。

					</text>
				</view>

				<view class="flexc i-type-box">
					<text class="i-type-title">食谱 | 按照病种查看</text>
					<view class="flexc i-type-list">
						<text class="i-item" v-for="(item,index) in typeData" @click="clickHandler(item)">{{item}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				forType: true,
				typeData: ["病种1", "病种1", "病种1", "病种1", "病种1", "病种1"]
			}
		},
		methods: {
			toMore() {
				uni.navigateTo({
					url: 'disease-type'
				})
			},
			clickHandler(item){
				uni.navigateTo({
					url:'disease-type-detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		flex-direction: row;
	}

	.flexc {
		display: flex;
		flex-direction: column;
	}

	.i-type-box {
		padding: 0 50rpx;
		padding-bottom: 108rpx;
		width: 100%;
		margin-top: 50rpx;

		.i-type-title {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}

		.i-type-list {
			padding-top: 10rpx;

			.i-item {
				height: 72rpx;
				line-height: 72rpx;
				padding-left: 40rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 10rpx 0rpx rgba(0, 0, 0, 0.08);
				border-radius: 4rpx;
				margin-top: 20rpx;
			}
		}

	}

	.container {
		font-size: 26rpx;
		color: #666666;

		.i-scroll-view {
			height: 100vh;

			.i-content {

				.i-head-tip {
					background-color: #FFFFFF;
					padding: 32rpx 36rpx 36rpx 36rpx;
					margin: 0 50rpx;
					margin-top: -100rpx;
					box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
					z-index: 9999;
					border-radius: 4rpx;
				}


				.i-target-box {
					border-radius: 4rpx;
					background-color: #FFFFFF;
					margin: 0 50rpx;
					margin-top: 60rpx;
					width: 100%;
					padding: 34rpx 52rpx;
					box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
					position: relative;

					.i-left {
						flex: 1;

						.i-target-item {
							margin-top: 18rpx;

							.i-tab {}

							.i-dot {
								width: 16rpx;
								height: 16rpx;
								background: #F6BC6A;
								border-radius: 8rpx;
								margin-right: 6rpx;
							}
						}
					}

					.i-space-line {
						border-left: 1rpx solid #EEEEEE;
						position: absolute;
						top: 70rpx;
						bottom: 34rpx;
						left: 50%;
					}

					.i-right {
						flex: 1;
						box-sizing: border-box;

					}
				}

				.i-text-box {
					padding-top: 50rpx;
					width: 100%;
					background-color: #FFFFFF;

					.i-title-box {
						justify-content: space-between;
						padding: 0 50rpx;
					}

					.i-text {
						padding: 0 50rpx;
						margin-top: 32rpx;
						line-height: rpx;
						padding-bottom: 36rpx;
					}
				}
			}
		}
	}
</style>
