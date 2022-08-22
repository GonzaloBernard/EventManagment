<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEgresoRequest;
use App\Http\Requests\UpdateEgresoRequest;
use App\Http\Resources\Admin\EgresoResource;
use App\Models\Egreso;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EgresoApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new EgresoResource(Egreso::all());
    }

    public function store(StoreEgresoRequest $request)
    {
        $egreso = Egreso::create($request->validated());

        return (new EgresoResource($egreso))
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

    public function show(Egreso $egreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new EgresoResource($egreso);
    }

    public function update(UpdateEgresoRequest $request, Egreso $egreso)
    {
        $egreso->update($request->validated());

        return (new EgresoResource($egreso))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(Egreso $egreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new EgresoResource($egreso),
            'meta' => [

            ],
        ]);
    }

    public function destroy(Egreso $egreso)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $egreso->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
