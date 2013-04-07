enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Pictures"},
		{kind: "enyo.FittableColumns", fit: true, components: [
      {kind: "List", fit: true, count: 100, onSetupItem: "setupItem", components: [
        {classes: "item", ontap: "itemTap", components: [
          {name: "name"}
        ]}
      ]}
		]}
	],
  rendered: function() {
    remoteStorage.claimAccess('pictures', 'r');
    remoteStorage.pictures.init();
    remoteStorage.displayWidget();
    var self = this;
    remoteStorage.on('ready', function(){
      remoteStorage.pictures.listPublicAlbums().then(function(albums){
        self.albums = albums;

        self.$.list.setCount(self.albums.length);
        self.$.list.reset();
      });
    });
  },
  albums: undefined,
  setupItem: function(inSender, inEvent) {
    var albumName = this.albums[inEvent.index];
    this.$.name.setContent(albumName);
  },
  itemTap: function(inSender, inEvent) {
    var albumName = this.$.name.content;
    // display albumName
  }
});
