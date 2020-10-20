<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grocery;
use Illuminate\Support\Facades\Validator;

class GroceryController extends Controller
{

    private $status = 200;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groceries = Grocery::all();
        if (count($groceries) > 0) {
            return response()->json(["status" => $this->status, "success" => true, "count" => count($groceries), "data" => $groceries]);
        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no record found"]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),
        [
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required'
        ]);
        
        if($validator->fails()) {
            return response()->json(["status" => "failed", "validation_errors" => $validator->errors()]);
        }

        $id = $request->id;
        $groceryArray = array(
            "name" => $request->name,
            "quantity" => $request->quantity,
            "price" => $request->price
        );

        if($id !="") {           
            $grocery = Grocery::find($id);
            if(!is_null($grocery)){
                $updated_status = Grocery::where("id", $id)->update($groceryArray);
                if($updated_status == 1) {
                    return response()->json(["status" => $this->status, "success" => true, "message" => "grocery detail updated successfully"]);
                }
                else {
                    return response()->json(["status" => "failed", "message" => "Whoops! failed to update, try again."]);
                }               
            }                   
        }
        else {
            $grocery = Grocery::create($groceryArray);
            if(!is_null($grocery)) {            
                return response()->json(["status" => $this->status, "success" => true, "message" => "grocery record created successfully", "data" => $grocery]);
            }    
            else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! failed to create."]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $grocery = Grocery::find($id);

        if(!is_null($grocery)) {
            return response()->json(["status" => $this->status, "success" => true, "data" => $grocery]);
        }
        else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! no Grocery found"]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $grocery = Grocery::find($id);
        return response()->json($grocery);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $grocery = Grocery::find($id);
        if(!is_null($grocery)) {
            $delete_status = Grocery::where("id", $id)->delete();
            if($delete_status == 1) {
                return response()->json(["status" => $this->status, "success" => true, "message" => "grocery record deleted successfully"]);
            }
            else{
                return response()->json(["status" => "failed", "message" => "failed to delete, please try again"]);
            }
        }
        else {
            return response()->json(["status" => "failed", "message" => "Whoops! no grocery found with this id"]);
        }
        
    }
}
