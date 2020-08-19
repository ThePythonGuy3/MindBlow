
const wormlib = require("mindblow/worm-base");

const cobra = extendContent(UnitType, "cobra", {
	load(){
		this.super$load();
		this.region = Core.atlas.find(this.name);
		this.bodyRegion = Core.atlas.find(this.name + "-body");
		this.tailRegion = Core.atlas.find(this.name + "-tail");
		this.cellRegion = Core.atlas.find(this.name + "-head-cell");
		this.cellBodyRegion = Core.atlas.find(this.name + "-body-cell");
		this.cellTailRegion = Core.atlas.find(this.name + "-tail-cell");
	},
	getReg(){
		return {
			head: this.region,
			body: this.bodyRegion,
			tail: this.tailRegion
		}
	},
	getCellReg(){
		return {
			head: this.cellRegion,
			body: this.cellBodyRegion,
			tail: this.cellTailRegion
		}
	}
});

const cobraBullet = extend(BasicBulletType, {});
cobraBullet.keepVelocity = false;
cobraBullet.damage = 1;
cobraBullet.speed = 6;
cobraBullet.lifetime = 60;
cobraBullet.status = new StatusEffect("astonished");
cobraBullet.status.speedMultiplier = 0;
cobraBullet.status.damage = 0.6;
cobraBullet.status.color = Team.crux.color;
cobraBullet.status.effect = Fx.hitFuse;
cobraBullet.statusDuration = 150;
cobraBullet.hitEffect = cobraBullet.status.effect;
cobraBullet.bulletShrink = 0;
cobraBullet.bulletWidth = 10;
cobraBullet.bulletHeight = 14;

const cobraBlaster = extendContent(Weapon, "cobra-blaster", {
	load(){
		this.region = Core.atlas.find("mindblow-cobra-blaster");
	}
});
cobraBlaster.alternate = false;
cobraBlaster.reload = 60;
cobraBlaster.bullet = cobraBullet;
cobraBlaster.shootSound = Sounds.shootSnap;

cobra.weapon = cobraBlaster;
cobra.shootCone = 150;
cobra.rotateWeapon = true;
cobra.create(prov(() => {
	unit = wormlib.newBase(18, 11.5, 0.01, 260, true, null, null, null, null, null, []);
	return unit;
}));
