<!-- 点击特效-->
<script type="text/javascript">
        var a_idx = 0;
        jQuery(document).ready(function ($) {
            $("body").click(function (e) {
                var a = [
                    "小天天","技术宅","小鸟游六花","robotmaster","ACMer","萝莉","人工智能","小白","四糸乃","Terminal","图论","数论","为了女儿说不定连魔王都能干掉",
                ];
                var b = [
                    "#FFF68F", "#FFBBFF", "#FF0000", "#FF00FF", "#F08080",
                    "#008000", "#7FFFAA", "#0000CD", "#0000FF", "#080808"
                ];
                var a_index = Math.floor((Math.random() * a.length));
                var b_index = Math.floor((Math.random() * b.length));
 
                var color = b[b_index];
                var $i = $("<span/>").text(a[a_index]);
                /* a_idx = (a_idx + 1) % a.length; */
                var x = e.pageX,
                    y = e.pageY;
 
                $i.css({
                    "z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
                    "top": y - 20,
                    "left": x,
                    "position": "absolute",
                    "font-weight": "bold",
                    "color": color,
                });
                $("body").append($i);
                $i.animate({
                    "top": y - 180,
                    "opacity": 0
                }, 1500, function () {
                    $i.remove();
                });
            });
        });
    </script>

<!-- 表头排序-->
<script type="text/javascript" src="https://files.cnblogs.com/files/nectar/jquery_table_sort.js"></script> 
<script>
$(document).ready(function() 
    { 
        $("table").addClass("tablesorter");
        $("table").tablesorter(); 
    } 
); 
</script>
