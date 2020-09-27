const brasssmelter = extendContent(GenericSmelter, "brass-smelter", {});

brasssmelter.buildType = () => extendContent(GenericSmelter.SmelterBuild, brasssmelter, {
	draw(){
		//brasssmelter.drawer.draw(this);

		var entity = this;
		Draw.rect(this.block.region, this.x, this.y)
		Shaders.build.region = /*Vars.content.getByName(ContentType.item, "mindblow-brass").icon(Cicon.medium)*/this.block.region;
        Shaders.build.progress = entity.progress;
        Shaders.build.color.set(Pal.accent);
        Shaders.build.color.a = entity.progress;
        Shaders.build.time = -entity.progress*15;
        Draw.draw(Layer.block, () => {
        	Draw.shader(Shaders.build, true);
			Draw.rect(Vars.content.getByName(ContentType.item, "mindblow-brass").icon(Cicon.medium), this.x, this.y)
			Draw.shader();
		});
		Draw.color(Pal.accent);
        Draw.alpha(entity.progress>0.0001?0.6:0);
		Lines.lineAngleCenter(this.x + Mathf.sin(entity.progress*150, 20, Vars.tilesize / 2 * this.block.size - 2)/2,this.y, 90, this.block.size * Vars.tilesize - Vars.tilesize * 2);
		Draw.reset();
		//Draw.rect(this.region, this.drawx(), this.drawy())
		if(entity.warmup > 0){
			var g = 0.3;
            var r = 0.06;
            var cr = Mathf.random(0.1);

            Draw.alpha(((1 - g) + Mathf.absin(Time.time(), 8, g) + Mathf.random(r) - r) * entity.warmup);


            Draw.color(1, 1, 1, entity.warmup);
            Draw.rect(this.block.topRegion, this.x, this.y);

            Draw.color();
        }
	}
});