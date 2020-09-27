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

const burnerturret = extendContent(ItemTurret, "burner", {
    update(tile){
        this.super$update(tile);
        tile.entity.rotation = tile.rotation()*90;
        if(this.hasAmmo(tile)){
  			this.updateShooting(tile);
		}
    },
    drawRequestRegion(req, list){
        reg = this.icon(Cicon.full);
        Draw.rect(this.icon(Cicon.full), req.drawx(), req.drawy(),
            reg.getWidth() * req.animScale * Draw.scl,
            reg.getHeight() * req.animScale * Draw.scl,
            !this.rotate ? 0 : req.rotation * 90-90);

        if(req.hasConfig){
            drawRequestConfig(req, list);
        }
    }
});
burnerturret.ammo(Items.coal, Bullets.pyraFlame, Items.pyratite, burnBullet);