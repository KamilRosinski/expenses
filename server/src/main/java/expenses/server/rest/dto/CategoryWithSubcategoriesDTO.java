package expenses.server.rest.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
@Getter
public class CategoryWithSubcategoriesDTO {

	private final Long id;

	private final String name;

	private final List<SubcategoryDTO> subcategories;

}
