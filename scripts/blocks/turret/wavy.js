const elib = require("effectlib");

const magicBulletmg = extend(BasicBulletType, {
	draw(b){
		elib.fillCircle(b.x, b.y, this.frontColor, 1, this.bulletWidth);
		elib.outlineCircle(b.x, b.y, this.backColor, 1, this.bulletWidth);
		if(b.timer.get(0, 3)){
			Effects.effect(this.trailEffectA, b.x, b.y, b.rot());
		}
    if(Time.delta() > 0){
		  Effects.effect(this.trailEffectB, b.x, b.y, b.rot());
    }
	}
});
magicBulletmg.damage = 90;
magicBulletmg.speed = 7;
magicBulletmg.lifetime = 100;
magicBulletmg.drag = 0.02;
magicBulletmg.bulletWidth = 9;
magicBulletmg.bulletHeight = 9;
magicBulletmg.frontColor = Color.valueOf("7efdfd");
magicBulletmg.backColor = Color.valueOf("e487ed");
magicBulletmg.shootEffect = Fx.shootBig;
magicBulletmg.smokeEffect = Fx.shootBigSmoke;
magicBulletmg.trailEffectA = newEffect(30, e => {
	elib.fillCircle(e.x, e.y, magicBulletmg.backColor, 1, 0.2 + e.fout() * 4.8);
});
magicBulletmg.trailEffectB = newEffect(48, e => {
	var angle = (Time.time() + Mathf.randomSeed(e.id, 360)) % 360;
	var dist = magicBulletmg.bulletWidth + 1 - e.fout() * 1.5;
	elib.fillCircle(e.x + Angles.trnsx(angle, dist), e.y + Angles.trnsy(angle, dist), magicBulletmg.backColor, 1, e.fout() * 1.1);
});
magicBulletmg.hitEffect = newEffect(18, e => {
	elib.fillCircle(e.x, e.y, magicBulletmg.frontColor, 0.2 + e.fin() * 0.8, 0.2 + e.fout() * 11.8);
	elib.outlineCircle(e.x, e.y, magicBulletmg.backColor, e.fout() * 4, e.fin() * 13);
});
magicBulletmg.despawnEffect = magicBulletmg.hitEffect;

const magicBulletp = extend(BasicBulletType, {
	draw(b){
		elib.fillCircle(b.x, b.y, this.frontColor, 1, this.bulletWidth);
		elib.outlineCircle(b.x, b.y, this.backColor, 1, this.bulletWidth);
		if(b.timer.get(0, 3)){
			Effects.effect(this.trailEffectA, b.x, b.y, b.rot());
		}
    if(Time.delta() > 0){
		  Effects.effect(this.trailEffectB, b.x, b.y, b.rot());
    }
	}
});
magicBulletp.damage = 100;
magicBulletp.speed = 7;
magicBulletp.lifetime = 100;
magicBulletp.drag = 0.02;
magicBulletp.bulletWidth = 9;
magicBulletp.bulletHeight = 9;
magicBulletp.splashDamage = 30;
magicBulletp.splashDamageRadius = 30;
magicBulletp.frontColor = Color.valueOf("b0ff7d");
magicBulletp.backColor = Color.valueOf("e6fa64");
magicBulletp.shootEffect = Fx.shootBig;
magicBulletp.smokeEffect = Fx.shootBigSmoke;
magicBulletp.trailEffectA = newEffect(30, e => {
	elib.fillCircle(e.x, e.y, magicBulletp.backColor, 1, 0.2 + e.fout() * 4.8);
});
magicBulletp.trailEffectB = newEffect(48, e => {
	var angle = (Time.time() + Mathf.randomSeed(e.id, 360)) % 360;
	var dist = magicBulletp.bulletWidth + 1 - e.fout() * 1.5;
	elib.fillCircle(e.x + Angles.trnsx(angle, dist), e.y + Angles.trnsy(angle, dist), magicBulletp.backColor, 1, e.fout() * 1.1);
});
magicBulletp.hitEffect = newEffect(18, e => {
	elib.fillCircle(e.x, e.y, magicBulletp.frontColor, 1.2 + e.fin() * 0.8, 1.2 + e.fout() * 11.8);
	elib.outlineCircle(e.x, e.y, magicBulletp.backColor, e.fout() * 4, e.fin() * 13);
});
magicBulletp.despawnEffect = magicBulletmg.hitEffect;

const changerBulletw = extend(BasicBulletType, {
	hitTile: function(b, tile){
		this.hit(b);
		if(tile.entity != null){
			tile.setTeam(b.getTeam());
		};
	},
	draw(b){
		elib.fillCircle(b.x, b.y, this.frontColor, 1, this.bulletWidth);
		elib.outlineCircle(b.x, b.y, this.backColor, 1, this.bulletWidth);
		if(b.timer.get(0, 3)){
			Effects.effect(this.trailEffectA, b.x, b.y, b.rot());
		}
    if(Time.delta() > 0){
		  Effects.effect(this.trailEffectB, b.x, b.y, b.rot());
    }
	}
});
changerBulletw.damage = 0;
changerBulletw.speed = 7;
changerBulletw.lifetime = 100;
changerBulletw.drag = 0.02;
changerBulletw.bulletWidth = 9;
changerBulletw.bulletHeight = 9;
changerBulletw.frontColor = Color.valueOf("ff8ffb");
changerBulletw.backColor = Color.valueOf("cd86e3");
changerBulletw.shootEffect = Fx.shootBig;
changerBulletw.smokeEffect = Fx.shootBigSmoke;
changerBulletw.trailEffectA = newEffect(30, e => {
	elib.fillCircle(e.x, e.y, changerBulletw.backColor, 1, 0.2 + e.fout() * 4.8);
});
changerBulletw.trailEffectB = newEffect(48, e => {
	var angle = (Time.time() + Mathf.randomSeed(e.id, 360)) % 360;
	var dist = changerBulletw.bulletWidth + 1 - e.fout() * 1.5;
	elib.fillCircle(e.x + Angles.trnsx(angle, dist), e.y + Angles.trnsy(angle, dist), changerBulletw.backColor, 1, e.fout() * 1.1);
});
const wavy = extendContent(DoubleTurret, "wavy", {
  init(){
    wavy.ammo(
      Items.metaglass, magicBulletmg,
      Items.plastanium, magicBulletp,
      Items.thorium, changerBulletw,
    );
    this.super$init();
  },
});