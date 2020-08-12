const pistonblock = extendContent(Block, "piston", {
	update(tile){
		this.super$update(tile);
		print(Vars.world.tile(tile.drawx(), this.drawy()+1).getX());
	}
});