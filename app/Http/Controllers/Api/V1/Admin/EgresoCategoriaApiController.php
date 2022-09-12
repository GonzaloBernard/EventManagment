<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEgresoCategoriaRequest;
use App\Http\Requests\UpdateEgresoCategoriaRequest;
use App\Http\Resources\Admin\EgresoCategoriaResource;
use App\Models\EgresoCategoria;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class EgresoCategoriaApiController extends Controller
{
    public function index()
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new EgresoCategoriaResource(EgresoCategoria::all());
    }

    public function store(StoreEgresoCategoriaRequest $request)
    {
        $egresoCategoria = EgresoCategoria::create($request->validated());

        return (new EgresoCategoriaResource($egresoCategoria))
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

    public function show(EgresoCategoria $egresoCategoria)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return new EgresoCategoriaResource($egresoCategoria);
    }

    public function update(UpdateEgresoCategoriaRequest $request, EgresoCategoria $egresoCategoria)
    {
        $egresoCategoria->update($request->validated());

        return (new EgresoCategoriaResource($egresoCategoria))
            ->response()
            ->setStatusCode(Response::HTTP_ACCEPTED);
    }

    public function edit(EgresoCategoria $egresoCategoria)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        return response([
            'data' => new EgresoCategoriaResource($egresoCategoria),
            'meta' => [

            ],
        ]);
    }

    public function destroy(EgresoCategoria $egresoCategoria)
    {
        abort_if(Gate::denies('user_management_access'), Response::HTTP_FORBIDDEN, '403 Forbidden');

        $egresoCategoria->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
