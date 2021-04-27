var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();

Vue.component('folder-contents', {
  props: ['folder', 'childrenOf'],
  template: `
    <details>
      <summary>📁 {{folder.name}}</summary>
      <ul>
        <li v-for="item in childrenOf(folder)">
          <folder-contents
            v-if="item.folder"
            :folder="item"
            :childrenOf="childrenOf"
          ></folder-contents>
          <file-item :item="item" v-else>
          </file-item>
        </li>
      </ul>
    </details>
  `
})

Vue.component('file-item', {
  props: ['item'],
  template: `
    <span class="file">
      📄 {{item.name}}
    </span>
  `
})

new Vue({
  el: "#vue",
  data: {
    fileItems: [],
    nextFolderId: 0
  },
  computed: {
    homeFolder() {
      return this.fileItems[0]
    },
    homeFolders() {
      return this.fileItems.filter(
        item => item.folder && item.parent === null
      )
    }
  },
  methods: {
    createFolder(name, parent) {
      this.fileItems.push({
        id: this.nextFolderId++,
        folder: true,
        name,
        parent
      })
    },
    createFile(name, parent) {
      this.fileItems.push({
        folder: false,
        name,
        parent
      })
    },
    childrenOf(folder) {
      return this.fileItems.filter(item => item.parent === folder.name)
    }
  },
  created() {
    this.createFolder("Applications", null)
    this.createFolder("Documents", null)
    this.createFolder("Downloads", null)
    this.createFolder("Movies", null)
    this.createFolder("Pictures", null)

    this.createFile("AppStore.app", "Applications")
    this.createFolder("Browsers", "Applications")
    this.createFile("Chrome.app", "Browsers")
    this.createFile("Firefox.app", "Browsers")

    this.createFile("cat.jpg", "Pictures")
    this.createFile("big-cat.jpg", "Pictures")
    this.createFile("small-cat.jpg", "Pictures")

    this.createFile("cat-vs-mouse.mp4", "Movies")
    this.createFile("cat-vs-dog.mp4", "Movies")
    this.createFile("cat-celebration-ceremony.mp4", "Movies")

    this.createFolder("Invoices", "Documents")
    this.createFolder("2018", "Invoices")
    "Jan Feb Mar Apr May".split(" ")
      .forEach(name => this.createFolder(name, "2018"))
    this.createFolder("2017", "Invoices")
    "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
      .forEach(name => this.createFolder(name, "2017"))

    this.createFolder("Secret", "Downloads")
    this.createFolder("Super Secret", "Secret")
    this.createFolder("Super Duper Secret", "Super Secret")
    this.createFile("passwords.txt", "Super Duper Secret")

  }
})
