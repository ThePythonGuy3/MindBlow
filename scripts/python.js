const wormlib = require("mindblow/worm-base");

const python = extendContent(UnitType, "python", {
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

const pythonBullet = extend(BasicBulletType, {});
pythonBullet.keepVelocity = false;
pythonBullet.damage = 35;
pythonBullet.speed = 5;
pythonBullet.lifetime = 30;
pythonBullet.status = new StatusEffect("poisoned");
pythonBullet.status.speedMultiplier = 0.8;
pythonBullet.status.damage = 0.6;
pythonBullet.status.color = Color.valueOf("490069");
pythonBullet.status.effect = newEffect(15, e => {
	Draw.color(Color.white, pythonBullet.status.color, e.fin());

	Lines.stroke(0.5 + e.fout());

	Angles.randLenVectors(e.id, 5, 3 + 20 * e.finpow(), new Floatc2(){get: (x, y) => {
		ang = Mathf.angle(x, y);
		Lines.lineAngle(e.x + x, e.y + y, ang, e.fout() * 4 + 0.4);
	}});
});
pythonBullet.statusDuration = 150;
pythonBullet.hitEffect = pythonBullet.status.effect;
pythonBullet.bulletShrink = 0;
pythonBullet.bulletWidth = 10;
pythonBullet.bulletHeight = 14;
pythonBullet.frontColor = Color.valueOf("d187ff");
pythonBullet.backColor = Color.valueOf("976bff");

const pythonBlaster = extendContent(Weapon, "python-blaster", {
	load(){
		this.region = Core.atlas.find("clear");
	}
});
pythonBlaster.alternate = false;
pythonBlaster.reload = 45;
pythonBlaster.bullet = pythonBullet;
pythonBlaster.shootSound = Sounds.shootSnap;

python.weapon = pythonBlaster;
python.shootCone = 90;
python.create(prov(() => {
	unit = wormlib.newBase(20, 11.5, 0.01, 120, true, null, null, null, null, null, []);
	return unit;
}));