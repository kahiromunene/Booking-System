
<div class="box box-primary">
  <div class="box-header with-border">
    <h3 class="box-title"><b>Book Event</b></h3>
  </div>
  <!-- /.box-header -->
  <!-- form start -->
  <form role="form" action="<?php echo WEB_ROOT; ?>api/process.php?cmd=book" method="post">
    <div class="box-body">
	   <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
		<span id="">
        <input type="text" name="title" class="form-control input-sm"  placeholder="Title" id="phone">
		</span>
      </div>
	  <div class="form-group">
        <label for="exampleInputEmail1">Description</label>
		<span id="">
        <textarea name="description" class="form-control input-sm" placeholder="Description" id="address"></textarea>
		</span>
      </div>
	 
	  <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
		<span id="">
        <input type="text" name="email" class="form-control input-sm" placeholder="Enter email" id="email">
		</span>
      </div>
	  
      <div class="form-group">
      <div class="row">
      	<div class="col-xs-6">
			<label>Reservation Date</label>
			<span id="">
        	<input type="date" name="rdate" class="form-control" placeholder="YYYY-mm-dd">
			</span>
        </div>
        <div class="col-xs-6">
			<label>Reservation Time</label>
			<span id="">
            <input type="time" name="rtime" class="form-control" placeholder="HH:mm">
			</span>
       </div>
      </div>
	  </div>
	  <div class="form-group">
			<label for="exampleInputEmail1">Duration</label>
			<input type="hidden" name="duration" value=""  id="userId"/>
			<span id="">
			<select name="name" class="form-control input-sm">
				<option>--select Duration--</option>
				<option value="15">15 Min</option>
				<option value="30">30 Min</option>
				<option value="45">45 Min</option>
				<option value="60">1 Hour </option>
				<option value="120">2 Hours</option>
				<option value="180">3 Hours</option>
				<option value="240">4 Hours</option>
				<option value="300">5 Hours</option>
				<option value="360">6 Hours</option>
				<option value="420">7 Hours</option>
				<option value="480">8 Hours</option>
				<option value="540">9 Hours</option>
				<option value="600">10 Hours</option>
				
			</select>
		
			</span>
      </div>			  
	  <div class="form-group">
        <label for="exampleInputPassword1">No of People</label>
		<span id="">
        <input type="text" name="ucount" class="form-control input-sm" placeholder="No of people" >
      </div>
    <!-- /.box-body -->
    <div class="box-footer">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</div>
<!-- /.box -->
<script type="text/javascript">

//-->
</script>

<script type="text/javascript">

</script>