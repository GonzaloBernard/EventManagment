<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreIngresoRequest;
use App\Http\Requests\UpdateIngresoRequest;
use App\Http\Resources\Admin\IngresoResource;
use App\Models\Ingreso;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IngresoApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new IngresoResource(Ingreso::all());
    }

    public function store(StoreIngresoRequest $request)
    {
        $ingreso = Ingreso::create($request->validated());

        return (new IngresoResource($ingreso))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function create()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'meta' => [

            ],
        ]);
    }

    public function show(Ingreso $ingreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new IngresoResource($ingreso);
    }

    public function update(UpdateIngresoRequest $request, Ingreso $ingreso)
    {
        $ingreso->update($request->validated());

        return (new IngresoResource($ingreso))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Ingreso $ingreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new IngresoResource($ingreso),
            'meta' => [

            ],
        ]);
    }

    public function destroy(Ingreso $ingreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $ingreso->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
