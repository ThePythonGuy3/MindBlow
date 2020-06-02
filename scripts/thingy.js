const thingyblock = extendContent(Block, "thingy", {
	update(tile){
		this.super$update(tile);
        for(i = 0; i < 15; i++){
            Calls.createBullet(Bullets.flakExplosive, tile.getTeam(), tile.drawx(), tile.drawy(), Mathf.random(360), Mathf.random(0.5, 1.0), Mathf.random(0.2, 1.0))
        }
    }
})

