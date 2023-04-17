import math
from rest_framework import pagination
from rest_framework.response import Response


class CustomPaginationObjetos(pagination.PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 30
    page_query_param = 'p'

    def get_paginated_response(self, data, request):
        response = Response(data)
        response['page_size'] = self.get_page_size(request)
        response['total_pages'] = (math.ceil(self.page.paginator.count / self.get_page_size(request)))
        response['total_objects'] = self.page.paginator.count
        return response

class CustomPaginationAcciones(pagination.PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 30
    page_query_param = 'p'

    def get_paginated_response(self, data, request):
        response = Response(data)
        response['page_size'] = self.get_page_size(request)
        response['total_pages'] = (math.ceil(self.page.paginator.count / self.get_page_size(request)))
        response['total_objects'] = self.page.paginator.count
        return response
