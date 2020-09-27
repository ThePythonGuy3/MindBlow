var chargeSfx = loadSound("astrocharge");

const kbull = extend(BasicBulletType, {
	draw(b){
		Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
		Fill.circle(b.x,b.y,13);
		Draw.reset();
	},
	update(b){
		if(Mathf.chance(0.3)){
			Damage.damage(b.team,b.x,b.y,13,20);
		}
		if(Mathf.chance(0.5)){
			Lightning.create(b.team, Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)), 10, b.x, b.y, Mathf.random(0,360), 10);
		}
		if(b.fin()*20>19){
			Sounds.artillery.at(b.x,b.y);
			for(var i = 0; i < 3; i++){
				Call.createBullet(Bullets.artilleryPlastic,b.team,b.x,b.y,i*120+Mathf.random(0,90),1,1,0.35);
			}
		}
	}
});
kbull.collides = false;
kbull.lifetime = 300;
kbull.speed = 2;
kbull.damage = 0;
kbull.despawnEffect = new Effect(20, e=>{
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Fill.circle(e.x,e.y,e.fout()*8+5);
	Draw.reset();
	Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fout()*160)*20, Mathf.sinDeg(e.fout()*50)*5, 10, e.fout()*360);
	Lines.stroke(e.fout()*2);
	Lines.circle(e.x,e.y,e.fin()*12+5);
	Lines.stroke(1);
});
const astro = extendContent(ChargeTurret,"astro",{
	load(){
		this.super$load();
		this.baseRegion = Core.atlas.find("mindblow-block-6")
	},
	generateIcons(){
		return [
			Core.atlas.find("mindblow-block-6"),
			Core.atlas.find("mindblow-astro")
		]
	}
});
astro.chargeTime = 180;
astro.chargeEffect = new Effect(180, e => {
	if(e.fin()*120<=1){
		chargeSfx.at(e.x,e.y);
	}
	/*if(e.fin()*120>=119){
		Sounds.shotgun.at(e.x,e.y);
	}*/
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Fill.circle(e.x,e.y,e.fin()*8+5);
	Draw.reset();
	Lines.spikes(e.x, e.y, Mathf.sinDeg(e.fin()*160)*20, Mathf.sinDeg(e.fin()*50)*5, 10, e.fin()*360);
});
astro.chargeBeginEffect = new Effect(180, e=> {
	Draw.color(Color.rgb(Mathf.random(150,255),Mathf.random(150,255),Mathf.random(150,255)));
	Lines.stroke(e.fin()*20);
	Lines.circle(e.x,e.y,e.fout()*10);
	Lines.stroke(1);
});
astro.shootType = kbull;
astro.powerUse = 5;
astro.rotatespeed = 0.5;
astro.shootSound = Sounds.shotgun;
astro.heatColor = Color.valueOf("7474ed");
astro.range = 400;
astro.reloadTime = 600;
astro.recoil = 100;
astro.restitution = 5;
astro.shootCone = 20;
astro.shootShake = 5;
astro.chargeEffects = 1;
astro.targetAir = false;
