const stingLazor = extend(BasicBulletType, {
	draw(b){
		var x1 = b.x + Angles.trnsx(b.rot()-90, -2, -2);
		var y1 = b.y + Angles.trnsy(b.rot()-90, -2, -2);
		var x2 = b.x + Angles.trnsx(b.rot()-90, 2, -2);
		var y2 = b.y + Angles.trnsy(b.rot()-90, 2, -2);
		var x3 = b.x + Angles.trnsx(b.rot()-90, 2, 7);
		var y3 = b.y + Angles.trnsy(b.rot()-90, 2, 7);
		var x4 = b.x + Angles.trnsx(b.rot()-90, 0, 10);
		var y4 = b.y + Angles.trnsy(b.rot()-90, 0, 10);
		var x5 = b.x + Angles.trnsx(b.rot()-90, -2, 7);
		var y5 = b.y + Angles.trnsy(b.rot()-90, -2, 7);
		var x6 = b.x + Angles.trnsx(b.rot()-90, 0, -5);
		var y6 = b.y + Angles.trnsy(b.rot()-90, 0, -5);
		Draw.color(Color.valueOf("54f798"));
		Fill.quad(x1, y1, x2, y2, x3, y3, x5, y5);
		Fill.tri(x3, y3, x4, y4, x5, y5);
		Fill.tri(x1, y1, x6, y6, x2, y2);
		Draw.color();
	}
});
stingLazor.pierce = true;
stingLazor.lifeTime = 20;
stingLazor.speed = 3;
stingLazor.damage = 32;
stingLazor.hitEffect = Fx.hitFuse;

const sting = extendContent(PowerTurret, "sting", {});
sting.shootType = stingLazor;
