$('.ui.rating')
  .rating()
;

$('.ui.rating.static')
  .rating("disable")
;

var NID = "";
Bmob.initialize("1fe041375281fb38612829308c8b2f06", "5e2d348f45b02e6915c8be18e384e335");

function submitComment(){
	var commentt = document.getElementById("commentBox").value;
	var rating = $('.ui.rating.edit').rating("get rating");
	// console.log(comment);
	// console.log(rating);

	var Data = Bmob.Object.extend("AllData");
	var data = new Data();
	// 添加数据，第一个入口参数是Json数据
	data.save({
	  rate: rating,
	  comment: commentt,
	  professor_name: "Olivier Marin",
	  professor_nyuid: "N12345678"
	}, {
	  success: function(data) {
	    // 添加成功
	    alert("Submitted!");
	  },
	  error: function(data, error) {
	    // 添加失败
	    alert("Submission failed!")
	  }
	});
}

function getRate(){
	var Data = Bmob.Object.extend("AllData");
	var query = new Bmob.Query(Data);
	query.equalTo("professor_nyuid", NID);
	query.find({
	  success: function(results) {
	  	var mark = 0;
	    for (var i = 0; i < results.length; i++) {
	      mark += results[i].get("rate");
	    }
	    loadComments(results);
	    if (!results.length) {
	    	$('.ui.rating.static').rating("set rating", 3);
	    } else {
	    	mark = Math.round(mark / results.length);
	    	$('.ui.rating.static').rating("set rating", mark);
	    }
	    
	  },
	  error: function(error) {}
	});
	
}

function loadComments(commentList) {
	console.log(commentList);
	let html = "";

	for (let i = 0; i < commentList.length; i++) {
		html +=
			`<div class="comment">
		      <a class="avatar">
		        <img src="https://cdn.shanghai.nyu.edu/sites/default/files/field/profile/Zheng%2C%20Zhang.jpg">
		      </a>
		      <div class="content">
		        <a class="author">Anonymous</a>
		        <div class="metadata">
		          <span class="date">${commentList[i].get("updatedAt")}</span>
		        </div>
		        <div class="text">
		          ${commentList[i].get("comment")}
		        </div>
		      </div>
		    </div>`;
	}
	$("#commentLoader").html(html);
}

window.onload = function () {

	NID = window.location.hash;
	if (!NID) window.open("/", "_self");
	else {
		NID = NID.substr(1);
	}

	getRate();

}