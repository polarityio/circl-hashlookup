polarity.export = PolarityComponent.extend({
  details: Ember.computed.alias("block.data.details"),
  timezone: Ember.computed('Intl', function () {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }),
  viewTrustFactorInfo: false,
  showParentInfo: false,
  showChildrenInfo: false,
  init() {
    let array = new Uint32Array(5);
    this.set("uniqueIdPrefix", window.crypto.getRandomValues(array).join(""));

    this._super(...arguments);
  },
  actions: {
    copyData: function () {
      Ember.run.scheduleOnce(
        "afterRender",
        this,
        this.copyElementToClipboard,
        `hash-lookup-container-${this.get("uniqueIdPrefix")}`
      );

      Ember.run.scheduleOnce("destroy", this, this.restoreCopyState);
    },
    toggleTrustFactorInfo: function () {
      this.toggleProperty("viewTrustFactorInfo");
    },
    toggleParentInfo: function() {
      this.toggleProperty("showParentInfo");
    },
    toggleChildrenInfo: function() {
      this.toggleProperty("showChildrenInfo");
    }
  },
  copyElementToClipboard(element) {
    window.getSelection().removeAllRanges();
    let range = document.createRange();

    range.selectNode(typeof element === "string" ? document.getElementById(element) : element);
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  },
  restoreCopyState() {
    this.set("showCopyMessage", true);

    setTimeout(() => {
      if (!this.isDestroyed) {
        this.set("showCopyMessage", false);
      }
    }, 2000);
  }
});
