//Thx to GlennFolker
function getLinkedBlock(tile, block, pred){
    entity = tile.ent();
    if(entity == null){return 0;}
    prox = entity.proximity();
    count = 0;
    prox.each(pred, cons(other => count++));
    return count;
}
const prism = extendContent(Block, "prism", {
	load(){
		this.super$load();
		this.lightsource = Vars.content.getByName(ContentType.block, "deepscience-lightsource");
	},
	update(tile){
		entity = tile.ent();
		entity.setLinkedNum(getLinkedBlock(entity.tile, this.lightsource, boolf(tile => {return tile.block() == this.lightsource && tile.ent().cons.valid();})));
	},
	draw(tile){
		entity = tile.ent();
		this.super$draw(tile);
		Draw.color(Color.valueOf("ff0000").shiftHue(Time.time()*entity,getLinkedNum());
		Lines.square(tile.drawx(), tile.drawy(), 20+Mathf.sinDeg(Time.time()*2*entity.getLinkedNum())*5, (Time.time()+Mathf.sinDeg(Time.time()*2*entity.getLinkedNum())*5)*entity.getLinkedNum());
		Draw.color();
	}
});
prism.entityType = prov(() => {
	const entity = extend(TileEntity, {
		getLinkedNum: function(){
			return this._lnum;
		},
		setLinkedNum: function(val){
			this._lnum = val;
		}
	});
	entity.setLinkedNum(0);
	return entity;
});


