const brasssmelter = extendContent(GenericSmelter, "brass-smelter", {
	draw(tile){
		entity = tile.ent();
		Draw.rect(this.region, tile.drawx(), tile.drawy())
		Shaders.build.region = /*Vars.content.getByName(ContentType.item, "mindblow-brass").icon(Cicon.medium)*/this.region;
        Shaders.build.progress = entity.progress;
        Shaders.build.color.set(Pal.accent);
        Shaders.build.color.a = entity.progress;
        Shaders.build.time = -entity.progress*15;
        Draw.shader(Shaders.build);
		Draw.rect(Vars.content.getByName(ContentType.item, "mindblow-brass").icon(Cicon.medium), tile.drawx(), tile.drawy())
		Draw.shader();
		Draw.color(Pal.accent);
        Draw.alpha(entity.progress>0.0001?0.6:0);
		Lines.lineAngleCenter(tile.drawx() + Mathf.sin(entity.progress*150, 20, Vars.tilesize / 2 * this.size - 2)/2,tile.drawy(), 90, this.size * Vars.tilesize - Vars.tilesize * 2);
		Draw.reset();
		//Draw.rect(this.region, tile.drawx(), tile.drawy())
		if(entity.warmup > 0){
			g = 0.3;
            r = 0.06;
            cr = Mathf.random(0.1);

            Draw.alpha(((1 - g) + Mathf.absin(Time.time(), 8, g) + Mathf.random(r) - r) * entity.warmup);


            Draw.color(1, 1, 1, entity.warmup);
            Draw.rect(this.topRegion, tile.drawx(), tile.drawy());

            Draw.color();
        }
	}
});