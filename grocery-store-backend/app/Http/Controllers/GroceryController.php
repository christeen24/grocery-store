<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Grocery;

class GroceryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groceries = Grocery::all();
        return response()->json($groceries);
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
        // $grocery = new Grocery([
        //     'name' => $request->get('name'),
        //     'quantity' => $request->get('quantity'),
        //     'price' => $request->get('price')
        // ]);
        // $grocery->save();

        // return response()->json('Grocery added successfully.');

        $request->validate([
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required' //optional if you want this to be required
        ]);
        $grocery = Grocery::create($request->all());
        return response()->json(['message'=> 'Grocery created', 
        'grocery' => $grocery]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Grocery $grocery)
    {
        return $grocery;
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
    public function update(Request $request, Grocery $grocery)
    {
        // $grocery = Grocery::find($id);
        // $grocery->name = $request->get('name');
        // $grocery->quantity = $request->get('quantity');
        // $grocery->price = $request->get('price');
        // $grocery->save();


        // return response()->json('Grocery Updated Successfully.');
    
        $request->validate([
            'name' => 'required',
            'quantity' => 'required',
            'price' => 'required' //optional if you want this to be required
        ]);
        $grocery->name = $request->name();
        $grocery->quantity = $request->quantity();
        $grocery->price = $request->price();
        $grocery->save();
        
        return response()->json([
            'message' => 'Grocery updated!',
            'grocery' => $grocery
        ]);
    
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Grocery $grocery)
    {
        // $grocery = Grocery::find($id);
        $grocery->delete();


      return response()->json('Grocery Deleted Successfully.');
    }
}
