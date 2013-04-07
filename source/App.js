enyo.kind({
	name: "App",
	kind: "FittableRows",
	fit: true,
	components:[
		{kind: "onyx.Toolbar", content: "Pictures"},
		{kind: "enyo.FittableColumns", fit: true, components: [
      {kind: "List", count: 0, onSetupItem: "setupItem", classes: "list", components: [
        {classes: "item", ontap: "itemTap", components: [
          {name: "name"}
        ]}
      ]},
      {kind: "ImageCarousel", fit: true, images: [''], defaultScale:"auto"},
    ]}
  ],
  rendered: function() {
    this.inherited(arguments);

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
    var album = remoteStorage.pictures.openPublicAlbum(albumName);
    self = this;
    album.list().then(function(itemNames){
      var pictureURLs = itemNames.map(album.getPictureURL);
      self.$.imageCarousel.setImages(pictureURLs);
    });
  }
});
