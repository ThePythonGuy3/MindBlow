
const wormlib = require("mindblow/worm-base");

const macer = extendContent(UnitType, "macer", {
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

const macerBullet = extend(BasicBulletType, {});
macerBullet.keepVelocity = false;
macerBullet.damage = 1;
macerBullet.speed = 6;
macerBullet.lifetime = 60;
macerBullet.status = new StatusEffect("astonished");
macerBullet.status.speedMultiplier = 0;
macerBullet.status.damage = 0.6;
macerBullet.status.color = Team.crux.color;
macerBullet.status.effect = Fx.hitFuse;
macerBullet.statusDuration = 150;
macerBullet.hitEffect = macerBullet.status.effect;
macerBullet.bulletShrink = 0;
macerBullet.bulletWidth = 10;
macerBullet.bulletHeight = 14;

const macerBlaster = extendContent(Weapon, "macer-blaster", {
	load(){
		this.region = Core.atlas.find("mindblow-macer-blaster");
	}
});
macerBlaster.alternate = false;
macerBlaster.reload = 60;
macerBlaster.bullet = macerBullet;
macerBlaster.shootSound = Sounds.shootSnap;

macer.weapon = macerBlaster;
macer.shootCone = 150;
macer.rotateWeapon = true;
macer.create(prov(() => {
	unit = wormlib.newBase(18, 11.5, 0.01, 260, true, null, null, null, null, null, []);
	return unit;
}));
