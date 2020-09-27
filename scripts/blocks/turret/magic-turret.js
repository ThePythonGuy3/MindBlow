const elib = require("effectlib");
var xpos = 0;
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
changerBulletw.hitEffect = newEffect(18, e => {
	elib.fillCircle(e.x, e.y, changerBulletw.frontColor, 1.2 + e.fin() * 0.8, 1.2 + e.fout() * 11.8);
	elib.outlineCircle(e.x, e.y, changerBulletw.backColor, e.fout() * 4, e.fin() * 13);
});
changerBulletw.despawnEffect = changerBulletw.hitEffect;


const wallchangerBullet = extend(BasicBulletType, {
    hitTile: function(b, tile){
        this.hit(b);
        if(tile.entity != null){
        	if(tile.block() == "plastanium-wall"){
        		Call.setTile(tile, Blocks.titaniumWall, tile.getTeam(), 0);
        	} else if (tile.block() == "thorium-wall"){
        		Call.setTile(tile, Blocks.plastaniumWall, tile.getTeam(), 0);
        	} else if (tile.block() == "titanium-wall"){
        		Call.setTile(tile, Blocks.copperWall, tile.getTeam(), 0);
        	} else if (tile.block() == "surge-wall"){
        		Call.setTile(tile, Blocks.phaseWall, tile.getTeam(), 0);
        	} else if (tile.block() == "phase-wall"){
        		Call.setTile(tile, Blocks.plastaniumWall, tile.getTeam(), 0);
        	} else if (tile.block() == "plastanium-wall-large"){
        		b.getOwner().damage(b.getOwner().maxHealth() * 0.3);
        		Call.setTile(tile, Blocks.titaniumWallLarge, tile.getTeam(), 0);
        	} else if (tile.block() == "thorium-wall-large"){
        		b.getOwner().damage(b.getOwner().maxHealth() * 0.3);
        		Call.setTile(tile, Blocks.plastaniumWallLarge, tile.getTeam(), 0);
        	} else if (tile.block() == "titanium-wall-large"){
        		b.getOwner().damage(b.getOwner().maxHealth() * 0.3);
        		Call.setTile(tile, Blocks.copperWallLarge, tile.getTeam(), 0);
        	} else if (tile.block() == "surge-wall-large"){
        		b.getOwner().damage(b.getOwner().maxHealth() * 0.3);
        		Call.setTile(tile, Blocks.phaseWallLarge, tile.getTeam(), 0);
        	} else if (tile.block() == "phase-wall-large"){
        		b.getOwner().damage(b.getOwner().maxHealth() * 0.3);
        		Call.setTile(tile, Blocks.plastaniumWallLarge, tile.getTeam(), 0);
        	};
		/*var blocks = [];
		var finalblocks = [];
        	for(i = 0; i < Vars.content.blocks().size; i++){
			var block = Vars.content.blocks().get(i);
			if(block == null || !(block instanceof Wall)) continue;
			blocks.push(block);
		};
		function compare(a, b){
			return a - b;
		};
		blocks.sort(compare);
		if(tile != null && tile.block() in blocks && blocks.indexOf(tile.block())!=0 && tile.block().size == blocks[blocks.indexOf(tile.block())-1].size){
			Call.setTile(tile, blocks[blocks.indexOf(tile.block())-1], tile.getTeam(), 0);
		}*/
		/*var blocks = [];
		var blockhealths = [];
                var finalblocks = [];
                for(i = 0; i < Vars.content.blocks().size; i++){
                        var block = Vars.content.blocks().get(i);
                        if(block == null || !(block instanceof Wall)) continue;
                        blocks.push(block);
                };
                function compare(a, b){
                        return b - a;
                };
		for(i = 0; i < blocks.length; i++){
			blockhealths.push(blocks[i].health);
		}
                blockhealths.sort(compare);
		print(blockhealths)
		if(tile != null && tile.block() in blocks && blockhealths.indexOf(tile.block().health)!=0 && tile.block().size == blocks[blockhealths.indexOf(tile.block().health)-1].size){
                	Call.setTile(tile, blocks[blocks.indexOf(tile.block())-1], tile.getTeam(), 0);
                }*/
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

wallchangerBullet.speed = 7;
wallchangerBullet.damage = 60;
wallchangerBullet.lifetime = 100;
wallchangerBullet.drag = 0.02;
wallchangerBullet.bulletWidth = 3;
wallchangerBullet.bulletHeight = 3;
wallchangerBullet.reloadMultiplier = 0.4;
wallchangerBullet.frontColor = Color.valueOf("ffee36");
wallchangerBullet.backColor = Color.valueOf("d18c5a");
wallchangerBullet.shootEffect = Fx.shootBig;
wallchangerBullet.smokeEffect = Fx.shootBigSmoke;
wallchangerBullet.changeEffect = newEffect(12, e => {
	elib.fillCircle(e.x, e.y, wallchangerBullet.backColor, 1, 0.2 + e.fout() * 4.8);
});
wallchangerBullet.trailEffectA = newEffect(30, e => {
	elib.fillCircle(e.x, e.y, wallchangerBullet.backColor, 1, 0.2 + e.fout() * 4.8);
});
wallchangerBullet.trailEffectB = newEffect(48, e => {
	var angle = (Time.time() + Mathf.randomSeed(e.id, 360)) % 360;
	var dist = wallchangerBullet.bulletWidth + 1 - e.fout() * 1.5;
	elib.fillCircle(e.x + Angles.trnsx(angle, dist), e.y + Angles.trnsy(angle, dist), wallchangerBullet.backColor, 1, e.fout() * 1.1);
});
wallchangerBullet.despawnEffect = newEffect(18, e => {
	elib.fillCircle(e.x, e.y, wallchangerBullet.frontColor, 1.2 + e.fin() * 0.8, 1.2 + e.fout() * 11.8);
	elib.outlineCircle(e.x, e.y, wallchangerBullet.backColor, e.fout() * 4, e.fin() * 13);
});
wallchangerBullet.hitEffect = newEffect(13, e => {
	elib.outlineCircle(e.x, e.y, Color.valueOf("e8af3c"), e.fout() * 4, e.fin() * 13);
	elib.outlineCircle(e.x, e.y, Color.valueOf("ffee36"), e.fout() * 4, e.fin() * 10);
});
const magicTurret = extendContent(ItemTurret, "magic-turret", {
  init(){
    this.ammo(
      Items.metaglass, magicBulletmg,
      Items.plastanium, magicBulletp,
      Items.thorium, changerBulletw,
      Items.surgealloy, wallchangerBullet,
    );
    this.super$init();
  },
});
