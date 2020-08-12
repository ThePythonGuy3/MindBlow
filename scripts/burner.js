const burnBullet = extend(BasicBulletType, {	
	hit: function(b){
		Damage.createIncend(b.x, b.y, 2, 2);
	},
	draw(b){}
});
burnBullet.speed = 1;
burnBullet.damage = 10;
burnBullet.lifetime = 50;
burnBullet.hitEffect = Fx.hitFlameSmall;
burnBullet.despawnEffect = Fx.none;
burnBullet.hitSize = 7;
burnBullet.ammoMultiplier = 4;
burnBullet.drawSize = 720;
burnBullet.pierce = true;
burnBullet.shootEffect = Fx.shootPyraFlame;
burnBullet.smokeEffect = Fx.none;

const burnerturret = extendContent(PowerTurret, "burner", {
	load(){
		this.super$load();
		this.region = Core.atlas.find(this.name);
	},
	generateIcons: function(){
		return [
			Core.atlas.find("block-1"),
			Core.atlas.find(this.name + "-ghost")
		];
	},
	update(tile){
		this.super$update(tile);
		tile.entity.rotation = tile.rotation()*90;
		this.updateShooting(tile);
	}
});
burnerturret.shootType = burnBullet;