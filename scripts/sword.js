const elib = require("effectlib");
const swordeffect = newEffect(20, e => {
    elib.fillCircle(e.x, e.y, Color.valueOf("ededed"), 1, e.fout()*4);
});
const swordBullet = extend(BasicBulletType, {
	draw(b){
		Effects.effect(swordeffect, b.x + (36 * Mathf.cosDeg((b.rot()))), b.y + (36 * Mathf.sinDeg((b.rot()))), 0);
		Effects.effect(swordeffect, b.x + (76 * Mathf.cosDeg((b.rot()))), b.y + (76 * Mathf.sinDeg((b.rot()))), 0);
		Effects.effect(swordeffect, b.x + (116 * Mathf.cosDeg((b.rot()))), b.y + (116 * Mathf.sinDeg((b.rot()))), 0);
		Effects.effect(swordeffect, b.x + (60 * Mathf.cosDeg((b.rot()+180))), b.y + (60 * Mathf.sinDeg((b.rot()+180))), 0);
		Effects.effect(swordeffect, b.x + (100 * Mathf.cosDeg((b.rot()+180))), b.y + (100 * Mathf.sinDeg((b.rot()+180))), 0);
		Effects.effect(swordeffect, b.x + (140 * Mathf.cosDeg((b.rot()+180))), b.y + (140 * Mathf.sinDeg((b.rot()+180))), 0);
		Draw.rect(Core.atlas.find("mindblow-laser-test-bullet"), b.x + (19 * Mathf.cosDeg((b.rot()))), b.y + (19 * Mathf.sinDeg((b.rot()))), b.rot()-90);
		Draw.rect(Core.atlas.find("mindblow-laser-test-bullet"), b.x + (43 * Mathf.cosDeg((b.rot()+180))), b.y + (43 * Mathf.sinDeg((b.rot()+180))), (b.rot()-90)+180);
		Damage.collideLine(b, b.team, Fx.none, b.x + (16 * Mathf.cosDeg((b.rot()))), b.y + (16 * Mathf.sinDeg((b.rot()))), b.rot(), 140);
		Damage.collideLine(b, b.team, Fx.none, b.x + (16 * Mathf.cosDeg((b.rot()+180))), b.y + (16 * Mathf.sinDeg((b.rot()+180))), b.rot()+180, 140);
	}
});
swordBullet.speed = 0.0001;
swordBullet.damage = 12;
swordBullet.lifetime = 10;
swordBullet.bulletHeight = 500;
swordBullet.hitEffect = Fx.none;
swordBullet.despawnEffect = Fx.none;
swordBullet.hitsize = 0.0001;
swordBullet.collides = false;
swordBullet.ammoMultiplier = 1;
swordBullet.shootEffect = Fx.none;
swordBullet.smokeEffect = Fx.none;

const swordgun = extendContent(LaserTurret, "sword", {
	update(tile){
		this.super$update(tile);
		
	},
	shoot(tile, type){
		this.super$shoot(tile, type);
	},
	shouldTurn(tile){
		this.super$shouldTurn(tile);
		tile.entity.rotation = tile.entity.rotation + 5;
	}
});
swordgun.shootType = swordBullet;
