var page = new pagination({
  container:'.pagination-container',
  total:100,
  callback:function (current) {
    console.log(current)
  }
})

