const swordBullet = extend(BasicBulletType, {	
	hit: function(b){
		Damage.createIncend(b.x, b.y, 2, 2);
	},
	draw(b){}
});
swordBullet.speed = 1;
swordBullet.damage = 10;
swordBullet.lifetime = 50;
swordBullet.hitEffect = Fx.hitFlameSmall;
swordBullet.despawnEffect = Fx.none;
swordBullet.hitSize = 7;
swordBullet.ammoMultiplier = 4;
swordBullet.drawSize = 720;
swordBullet.pierce = true;
swordBullet.shootEffect = Fx.shootPyraFlame;
swordBullet.smokeEffect = Fx.none;

const swordgun = extendContent(LaserTurret, "sword", {
	update(tile){
		this.super$update(tile);
		tile.entity.rotation = tile.entity.rotation + 5;
	},
	shoot(tile, type){
		this.super$shoot(tile, type);
	},
	shouldTurn(){}
});